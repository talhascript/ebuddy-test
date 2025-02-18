import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Validator from "validatorjs";
import admin from "firebase-admin";
import UserRepository from "../repository/user.repo";
import { User } from "../models/user.model";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret_key";

export default class IndexController {

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = new Validator(req.body, {
        email: "required|email",
        password: "required|min:6",
        name: "required|string",
        age: "required|numeric",
        country: "required|string",
      });

      if (validation.fails()) {
        res.status(400).json({ error: validation.errors.all() });
        return;
      }

      const { email, password, name, age, country } = req.body;

      // Create user in Firebase Authentication first
      try {
        const firebaseUser = await admin.auth().createUser({ email, password });

        // If Firebase Auth user creation is successful, create the user in Firestore
        const userRepository = new UserRepository();
        const user: User = { email, name, age, country };
        await userRepository.addUser(user);

        // Generate JWT Token
        const token = jwt.sign({ email, name }, SECRET_KEY, { expiresIn: "7d" });

        res.status(201).json({ user, token });
      } catch (authError) {
        // If Firebase Authentication fails, return an error
        res.status(500).json({ error: "Firebase Authentication failed: " + (authError as Error).message });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public updateUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = new Validator(req.body, {
        email: "required|email",
        name: "required|string",
        age: "required|numeric",
        country: "required|string",
      });

      if (validation.fails()) {
        res.status(400).json({ error: validation.errors.all() });
        return;
      }

      const { email, name, age, country } = req.body;

      const userRepository = new UserRepository();
      const user: User = { email, name, age, country };
      await userRepository.updateUser(user);

      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = new Validator(req.body, {
        email: "required|email",
        password: "required|min:6",
      });

      if (validation.fails()) {
        res.status(400).json({ error: validation.errors.all() });
        return;
      }

      const { email } = req.body;

      // Generate JWT Token
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "7d" });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public validateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return;
      }

      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      req.body.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };

  public fetchUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization;
      const { email } = (req as any).user;

      const userRepository = new UserRepository();
      const user = await userRepository.getUser(email);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public fetchAllUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const userRepository = new UserRepository();
      const users = await userRepository.getAllUsers();

      if (!users || users.length === 0) {
        res.status(404).json({ error: "No users found" });
        return;
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
