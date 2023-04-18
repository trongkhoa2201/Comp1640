import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
export const isQAM = (req, res, next) => {
  if (req.user && req.user.role === "qam") {
    next();
  } else {
    res.status(401).send({ message: "Invalid QA Manager Token" });
  }
};
export const isQAC = (req, res, next) => {
  if (req.user && req.user.role === "qac") {
    next();
  } else {
    res.status(401).send({ message: "Invalid QA Coordinator Token" });
  }
};
