import jwtLib from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function tokenValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(400)
        .json({ message: "Authorization header is required" });
    }

    if (typeof authorization !== "string") {
      return res
        .status(400)
        .json({ message: "Authorization header must be a string" });
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const token = parts[1];
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const verified = jwtLib.verify(token, process.env.JWT_SECRET as string);
    if (!verified) {
      return res.status(401).json({ message: "Invalid token" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error validating token", error });
  }
}
