import { compare, hash } from "bcrypt"
import config from "../../config"
import { IContext, IPost, ISignin, IUser } from "../../types"
import { jwtToken } from "../../utils/jwtHelper"

export const Mutation = {

    signup: async (parent: any, args: IUser, { prisma }: IContext) => {
        const { bio, ...rest } = args
        const hashPassword = await hash(args.password, Number(config.bcrypt.salt))
        const user = await prisma.user.create({
            data: {
                ...rest,
                password: hashPassword
            }
        })

        if (user && args.bio) {
            await prisma.profile.create({
                data: {
                    userId: user.id,
                    bio: bio
                }
            })
        }

        return user

    },

    signin: async (parent: any, args: ISignin, { prisma }: IContext) => {

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

    },

    addPost: async (parent: any, args: IPost, { prisma, userInfo }: IContext) => {

        await prisma.user.findUniqueOrThrow({
            where: {
                id: userInfo.userId
            }
        })

        const result = await prisma.post.create({
            data: {
                ...args,
                authorId: userInfo.userId
            }
        })

        return {
            message: 'Post is created',
            data: result
        }

    }



}