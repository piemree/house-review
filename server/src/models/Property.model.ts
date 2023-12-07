import { $Enums, Prisma, PrismaClient } from "@prisma/client";

class PropertyModel {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getMyPropertyById(id: string, userId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });
    if (!property) {
      throw new Error("Property not found");
    }

    return property;
  }
  async createProperty(input: Prisma.PropertyCreateInput) {
    const property = await this.prisma.property.create({
      data: input,
    });
    return { success: !!property };
  }
  async getAllProperties() {
    const properties = await this.prisma.property.findMany();
    return { success: !!properties, properties: properties };
  }
}

export default new PropertyModel();
