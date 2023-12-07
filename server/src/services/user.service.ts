import { Prisma, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

export const createUser = async (data: Prisma.UserCreateInput) => {
    data.password = await hash(data.password, 10)
    return await prisma.user.create({ data })
}

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    })
}

export const getUserProfile = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
        },
    })
}
