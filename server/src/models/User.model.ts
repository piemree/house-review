import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserModel {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getUserProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }
}

export default new UserModel();
