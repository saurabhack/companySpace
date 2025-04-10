import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";
import { setUser } from "../service/auth.service.js";


export async function register(req, res) {
  const { companyName, companyType, companyEmail, password } = req.body;
  console.log("Register Request:", req.body);

  if (!companyName || !companyType || !companyEmail || !password) {
    console.warn("Validation Failed: All fields are required");
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    const existingCompany = await prisma.company.findFirst({
      where: { companyEmail }
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company already exists. Please login instead."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = await prisma.company.create({
      data: {
        companyName,
        companyType,
        companyEmail,
        password: hashedPassword
      }
    });

    const token = jwt.sign(
      { id: newCompany.id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    setUser(newCompany.id, newCompany);

    res.cookie("companyToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully!",
      company: newCompany
    });

  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
}


export async function login(req, res) {
  const { companyEmail, password } = req.body;

  if (!companyEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  try {
    const company = await prisma.company.findFirst({
      where: { companyEmail }
    });

    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      { id: company.id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("companytoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      company
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
}

export async function logOut(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully."
    });

  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong during logout." });
  }
}
