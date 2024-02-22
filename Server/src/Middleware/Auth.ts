import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const jwtSecret: any = process.env.JWT_SECRET_KEY;

export const AuthenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) {
        next(
          {
            message: "Unauthorised",
            status: 401
          }
        );
      }
      req.user = user;
      next();
    });
  } else {
    next(
      {
        message: "Unauthorised",
        status: 401
      }
    );
  }
};

export const CreateJWT = (req: any, res: any, next: any) => {
  let successMessage = "User successfully created";
  let payload =
  {
    id: req.body.email,
    auth: req.body.password
  };
  jwt.sign(payload, jwtSecret, (error, token) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error,
      };
      next(err)
    }
    else {
      res.set('sessionId', token);
      res.status(200).json(successMessage)
    }
  });
};
