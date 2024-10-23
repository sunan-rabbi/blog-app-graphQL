import { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import config from '../config'
import { ISignin, IUser } from '../types';
import { jwtToken } from '../utils/jwtHelper';

const prisma = new PrismaClient()

export const resolvers = {
    Query: {

        users: async (parent: any, args: any, context: any) => {
            return await prisma.user.findMany()
        },

        posts: async (parent: any, args: IUser, context: any) => {
            return await prisma.post.findMany()
        },

        me: async (parent: any, args: { email: string }, context: any) => {
            return await prisma.user.findUnique({
                where: {
                    email: args.email
                }
            })
        },

        profile: async (parent: any, args: { email: string }, context: any) => {
            const user = await prisma.user.findUnique({
                where: {
                    email: args.email
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            return await prisma.profile.findUnique({
                where: {
                    userId: user.id
                }
            });
        }

    },

    Mutation: {

        signup: async (parent: any, args: IUser, context: any) => {

            const hashPassword = await hash(args.password, Number(config.bcrypt.salt))
            const user = await prisma.user.create({
                data: {
                    ...args,
                    password: hashPassword
                }
            })

            if (user && args.bio) {
                await prisma.profile.create({
                    data: {
                        userId: user.id,
                        bio: args.bio
                    }
                })
            }

            return user

        },

        signin: async (parent: any, args: ISignin, context: any) => {

            const isUserExists = await prisma.user.findUnique({
                where: {
                    email: args.email
                }
            })

            if (!isUserExists) {
                return {
                    message: "User doesn't exists",
                    token: null
                }
            }

            const isMatched = await compare(args.password, isUserExists.password)

            if (!isMatched) {
                return {
                    message: "Password doesn't match",
                    token: null
                }
            }

            const jwtPayload = {
                userId: isUserExists.id,
                email: isUserExists.email
            }

            const token = await jwtToken(jwtPayload)

            return {
                message: "Signin is completed",
                token
            }

        }

    }
};