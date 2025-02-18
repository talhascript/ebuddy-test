import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  static JWT_SECRET = process.env.JWT_SECRET || "secret";

  public async authorize(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization;
  
    if (!token) {
      res.status(401).json({ error: "Access denied, no token provided" });
      return 
    }
  
    try {
      const decoded = jwt.verify(token, AuthMiddleware.JWT_SECRET);
      (req as any).user = decoded;
      return next();
    } catch (error) {
      res.status(403).json({ error: "Invalid token" });
      return 
    }
  }
}
