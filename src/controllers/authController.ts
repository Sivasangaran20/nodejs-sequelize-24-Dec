import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import db from "../config/database";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const [user] = await db.query(
      "insert into user(id, username,email,password, createdAt, updatedAt) values (DEFAULT ,?,?,?, NOW(), NOW())",
      { replacements: [username, email, hashedPassword] }
    );

    console.log(user);

    res.status(201).json({ msg: "user created" });
    // return res.send(user);
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(409).json({ msg: "email or password is missing" });
    }

    const user = await db.query("select * from user where email = ?", {
      replacements: [email],
    });

    console.log(user, "user");

    // const hashedpass = user.password;

    // const comparePass = bcrypt.compareSync(password, hashedpass);

    // if (!comparePass) {
    //   res.status(401).json({ msg: "unauthorized" });
    // }
    const response = JWT.sign(
      { email, password },
      process.env.JWT_SECRET || "Secret123",
      {
        algorithm: "RS512",
      }
    );

    res.status(200).json(response);
  } catch (error) {
    res.send(error);
  }
};
