import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserHJwtPayload {
  // custom fields
  id: string;
  email: string;
  // standard fields
  iat?: number;
  exp?: number;
}

export const verifyLogintoken = (token: string): UserHJwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as UserHJwtPayload;
};

export const createLogintoken = (payload: UserHJwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
