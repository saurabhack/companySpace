import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authorization header missing or malformed" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ success: false, message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export default verifyToken;