import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type createProperty = {
  userId: string;
  address: string;
  floorNumber: number;
  flatNumber: number;
  xCoordinate: number;
  yCoordinate: number;
  isOwner: boolean;
  isTenant: boolean;
  propertyImages: string[];
  contractImages: string[];
};
export const createProperty = async (data: createProperty) => {
  const property = await prisma.property.create({
    data: {
      address: data.address,
      floorNumber: data.floorNumber,
      flatNumber: data.flatNumber,
      xCoordinate: data.xCoordinate,
      yCoordinate: data.yCoordinate,
      contractImages: data.contractImages,
      propertyImages: data.propertyImages,
      ownerId: data.isOwner ? data.userId : null,
      Tenants: {
        connect: data.isTenant ? [{ id: data.userId }] : [],
      },
    },
  });
  return property;
};

export const getMyPropertyById = async (id: number, userId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
      OR: [
        {
          ownerId: userId,
        },
        {
          Tenants: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    include: {
      Comments: {
        include: {
          reviewer: true,
          Rating: true,
        },
      },
    },
  });
  return property;
};

export const getAllProperties = async () => {
  const properties = await prisma.property.findMany({});
  return properties;
};

export const getUserWhishlist = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      WishList: true,
    },
  });
  return user?.WishList;
};

export const addPropertyToWishlist = async (
  userId: string,
  propertyId: number
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      WishList: {
        connect: {
          id: propertyId,
        },
      },
    },
    include: {
      WishList: true,
    },
  });
  return user.WishList;
};

export const removePropertyFromWishlist = async (
  userId: string,
  propertyId: number
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      WishList: {
        disconnect: {
          id: propertyId,
        },
      },
    },
    include: {
      WishList: true,
    },
  });
 return user.WishList;
};
