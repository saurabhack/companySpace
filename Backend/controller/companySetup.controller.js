import prisma from "../DB/db.config.js";
import decodeToken from "../service/decodeToken.service.js";
import bcrypt from 'bcryptjs';
import passwordGenerator from "../service/passwordGenerator.js";
import jwt from "jsonwebtoken";

// REGISTER ADMIN
export async function registerAdmin(req, res) {
  const { name, email, password, passwordOption } = req.body;

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "You need to login first" });
    }

    const tokenInfo = await decodeToken(token);
    if (!tokenInfo?.id) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    if (!name || !email || !passwordOption) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const existingAdmin = await prisma.admin.findFirst({
      where: { workEmail: email }
    });

    if (existingAdmin && existingAdmin.company_id === tokenInfo.id) {
      return res.status(409).json({ success: false, message: "Admin already exists for this company" });
    }

    let hashedPassword;
    let generatedPassword;

    if (passwordOption === "Custom") {
      if (!password) {
        return res.status(400).json({ success: false, message: "Custom password is required" });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    } else if (passwordOption === "Auto") {
      generatedPassword = await passwordGenerator(tokenInfo.id, name, "admin");
      hashedPassword = await bcrypt.hash(generatedPassword, 10);
    } else {
      return res.status(400).json({ success: false, message: "Invalid password option" });
    }

    const newAdmin = await prisma.admin.create({
      data: {
        fullName: name,
        workEmail: email,
        password: hashedPassword,
        company_id: parseInt(tokenInfo.id)
      }
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: newAdmin,
      ...(generatedPassword ? { autoPassword: generatedPassword } : {})
    });

  } catch (error) {
    console.error("Error while registering admin:", error);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
}

// LOGIN ADMIN
export async function loginAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const admin = await prisma.admin.findFirst({
      where: { workEmail: email }
    });

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({ success: true, message: "Admin logged in successfully", data: admin });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
}

// ADD HR
export async function addHr(req, res) {
  const { name, email } = req.body;

  try {
    if (!name || !email ) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const token = req.cookies.companyToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Please login or register your company" });
    }

    const tokenInfo = await decodeToken(token);
    if (!tokenInfo?.id) {
      return res.status(403).json({ success: false, message: "Invalid company token" });
    }

    const existingHr = await prisma.employees.findFirst({
      where: {
        email,
        company_id: tokenInfo.id,
        role: "hr"
      }
    });

    if (existingHr) {
      return res.status(409).json({ success: false, message: "HR already exists for this company" });
    }

    const generatedPassword = await passwordGenerator(tokenInfo.id, name, "hr");
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const hr = await prisma.employees.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "hr",
        company_id: tokenInfo.id
      }
    });

    return res.status(201).json({
      success: true,
      message: "HR added successfully",
      data: hr,
      autoPassword: generatedPassword
    });

  } catch (error) {
    console.error("Error while adding HR:", error);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
}
