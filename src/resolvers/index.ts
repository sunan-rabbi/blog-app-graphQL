import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()
const saltRound = 12

type IUser = {
    name: string;
    email: string;
    password: string;
}

export const resolvers = {
    Query: {

    },
    Mutation: {
        signup: async (parent: any, args: IUser, context: any) => {

            const hashPassword = await hash(args.password, saltRound)
            return await prisma.user.create({
                data: {
                    ...args,
                    password: hashPassword
                }
            })

        }
    }
};