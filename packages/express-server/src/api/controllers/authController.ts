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

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashedPassword = await authService.hashPassword(password);
    const newUser = await User.create({ username, password: hashedPassword });

    console.log(newUser);

    const token = jwt.sign({ user: newUser }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    res.status(201).json({ message: "User created", token });
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

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}
