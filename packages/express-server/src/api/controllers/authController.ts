import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel";
import authService from "../services/authService";
import jwtConfig from "../../config/jwtConfig";

export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (username.length < 4 || username.length > 155) {
      return res
        .status(400)
        .json({ message: "Username must be between 4 and 155 characters" });
    }

    if (password.length < 8 || password.length > 255) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 255 characters" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const newUser = await User.create({ username, password });

    const token = jwt.sign({ user: newUser }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    res
      .status(201)
      .json({ message: "User created", data: { user: newUser, token } });
  } catch (error) {
    res.status(500).json({ message: "Error registering new user", error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await authService.comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful", data: { user, token } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}

export function validate(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(400)
        .json({ message: "Authorization header is required" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verified) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    res.status(500).json({ message: "Error validating token", error });
  }
}
