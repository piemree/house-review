import { verifyLogintoken } from '../src/services/auth.service'
import { Request } from 'express'

export const getUserFromHeader = async (req: Request) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const user = await verifyLogintoken(token)
        return user
    }
    return null
}
