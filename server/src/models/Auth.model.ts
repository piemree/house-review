import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthModel {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async emailCheck(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return {
      isUserExists: !!user,
    };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const passValid = bcrypt.compareSync(input.password, user.password);
    if (!passValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string
    );
    return { token };
  }

  async register(input: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data: input,
    });
    return { success: !!user };
  }
}

export default new AuthModel();
