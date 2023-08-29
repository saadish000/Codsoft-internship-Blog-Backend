import jwt from "jsonwebtoken";
const Secret_key = "its-json-web-token-secret-key";

const tokenAuthentication = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(402).json({
      statusCode: 402,
      success: false,
      message: "Cannot get Authorization Header",
      payload: {},
    });
  }

  try {
    const decoded = jwt.verify(token, Secret_key);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(402).json({
      statusCode: 402,
      success: false,
      message: "Cannot get Authorization Token",
      payload: { error },
    });
  }
};
