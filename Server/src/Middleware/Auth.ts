import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Session } from "../Classes/Session";

// Validate the JWT secret
const jwtSecret = process.env.OUTS_JWT_SECRET_KEY;
const jwtRefreshSecret = process.env.OUTS_JWT_REFRESH_SECRET_KEY!;
if (!jwtSecret) {
  throw new Error("JWT secret key is not defined. Please check your .env file.");
}

/**
 * Middleware to authenticate JWT tokens.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const AuthenticateJWT = (req: Request, res: Response, next: (user: any) => void): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Pass the `user` object to the next middleware
      next(user);
    });
  } else {
    res.status(401).json({ message: "Authorization header is required." });
  }
};/**
 * Generates a JWT token and attaches it to the response.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const CreateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { UserId, UserRole, Email, BusinessId } = req.body;

  const payload = { UserId, UserRole, Email, BusinessId };

  // Generate Access Token
  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });

  // Generate Refresh Token
  const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: "7d" });

  // You can optionally store the refresh token in your database (linked to the user)
  // Example: await saveRefreshTokenToDB(UserId, refreshToken);

  res.status(200).json({
    message: req.body.successMessage || "Operation successful.",
    accessToken,
    refreshToken,
  });
};

export const RefreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(403).json({ message: "Refresh token is required" });
  }

  jwt.verify(refreshToken, jwtRefreshSecret, async (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    const payload = {
      UserId: user.UserId,
      UserRole: user.UserRole,
      Email: user.Email,
      BusinessId: user.BusinessId,
    };

    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: "7d" });

    // Send new tokens to the client
    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  });
};

