import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const jwtSecret: any = process.env.JWT_SECRET_KEY;

export const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};