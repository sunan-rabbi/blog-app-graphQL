import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import config from '../config'
import { IUser } from '../types';

const prisma = new PrismaClient()

export const resolvers = {
    Query: {

    },
    Mutation: {
        signup: async (parent: any, args: IUser, context: any) => {

            const hashPassword = await hash(args.password, Number(config.bcrypt.salt))
            return await prisma.user.create({
                data: {
                    ...args,
                    password: hashPassword
                }
            })

        }
    }
};