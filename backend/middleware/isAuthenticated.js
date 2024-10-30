import jwt from "jsonwebtoken";
const isAuthenticated = async (req, resp, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
      return resp.status(401).json({ message: "user not authenticated" });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return resp.status(401).json({ message: "Invalid token" });
    }

    req.id = decode.userId;
    next();
  } catch (err) {
    console.log(err);
  }
};

export default isAuthenticated;
