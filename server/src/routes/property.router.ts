import { Property } from "@prisma/client";
import {
  addPropertyToWishlist,
  createProperty,
  getAllProperties,
  getMyPropertyById,
  getUserWhishlist,
  removePropertyFromWishlist,
} from "../services/property.service";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import PropertyModel from "../models/Property.model";

export const propertyRouter = router({
  createProperty: privateProcedure
    .meta({
      openapi: { method: "POST", path: "/createProperty", tags: ["Property"] },
    })
    .input(
      z.object({
        address: z.string(),
        floorNumber: z.number(),
        flatNumber: z.number(),
        xCoordinate: z.number(),
        yCoordinate: z.number(),
        isOwner: z.boolean(),
        isTenant: z.boolean(),
        propertyImages: z.array(z.string()),
        contractImages: z.array(z.string()),
      })
    )
    .output(
      z.promise(
        z.object({
          success: z.boolean(),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const data = {
        ...input,
        userId: ctx.user?.id,
      };
      return await PropertyModel.createProperty(data);
    }),

  getMyPropertyById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await PropertyModel.getMyPropertyById(input.id, ctx.user?.id);
    }),

  getAllProperties: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/getAllProperties", tags: ["Property"] },
    })
    .input(z.void())
    .output(
      z.promise(
        z.object({
          success: z.boolean(),
          properties: z.array(
            z.object({
              id: z.string(),
              address: z.string(),
              floorNumber: z.number(),
              flatNumber: z.number(),
              xCoordinate: z.number(),
              yCoordinate: z.number(),
              avarageRating: z.number(),
              createdAt: z.date(),
              updatedAt: z.date(),
              ownerId: z.string().nullable(),
              propertyImages: z.array(z.string()),
              contractImages: z.array(z.string()),
              approvedById: z.string().nullable(),
            })
          ),
        })
      )
    )
    .query(async () => {
      return await PropertyModel.getAllProperties();
    }),
});
