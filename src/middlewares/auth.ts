import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/JWT";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [_, token] = authHeader.split(" ");

  try {
    jwt.verify(token, jwtConfig.secret, (err, result) => {
      if (err) {
        throw "Token invalid";
      }

      // tenho que tipar aq
      req.consumerId = result.id;

      return next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
