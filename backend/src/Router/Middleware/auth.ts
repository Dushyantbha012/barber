const jwt = require("jsonwebtoken");

const auth = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      message: "Login or Signup",
    });
  }
  try {
    const decoded = jwt.verify(authHeader, "SECRET_KEY");
    if (decoded.userId) {
      req.body.userId = decoded.userId;
      next();
    } else if (decoded.ownerId) {
      req.body.ownerId = decoded.ownerId;
      next();
    } else if (decoded.barberId) {
      req.body.barberId = decoded.barberId;
      next();
    } else res.status(411).json({ message: "error verifying you" });
  } catch (err) {
    return res.status(403).json({
      message: "Authentication Failed",
    });
  }
};

export default auth;
