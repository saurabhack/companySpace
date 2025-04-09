import prisma from "../DB/db.config.js";
import decodeToken from "../service/decodeToken.service.js";

// Middleware: Check if a company is logged in
export async function loggedInUsers(req, res, next) {
  try {
    const token = req.cookies?.companytoken;
    console.log("Company token from cookie:", token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login or register your company",
      });
    }

    const tokenInfo = await decodeToken(token);
    console.log("Decoded company token info:", tokenInfo);

    if (!tokenInfo || tokenInfo.role !== "company" || !tokenInfo.id) {
      return res.status(403).json({
        status: false,
        message: "Invalid or expired token. Please login again.",
      });
    }

    const user = await prisma.company.findUnique({
      where: { id: tokenInfo.id },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Company not found. Please register.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in loggedInUsers middleware:", error);
    return res.status(500).json({
      status: false,
      message: "Server error: " + error.message,
    });
  }
}

// Middleware: Check if admin is logged in
export async function isAdminLoggedIn(req, res, next) {
  try {
    const token = req.cookies?.adminToken;
    console.log("Admin token from cookie:", token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login or register as an admin",
      });
    }

    const tokenInfo = await decodeToken(token);
    console.log("Decoded admin token info:", tokenInfo);

    if (!tokenInfo || tokenInfo.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Access denied. Only admins are allowed.",
      });
    }

    req.admin = tokenInfo;
    next();
  } catch (error) {
    console.error("Error in isAdminLoggedIn middleware:", error);
    return res.status(500).json({
      status: false,
      message: "Server error: " + error.message,
    });
  }
}
