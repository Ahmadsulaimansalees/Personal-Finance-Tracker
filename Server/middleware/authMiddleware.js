const jwt = require("jsonwebtoken");
const UserInfo = require("../models/UserInfo");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "NOT Authorized, invalid token or expired token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserInfo.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "NOT Authorized, invalid token or expired token" });
  }
};
