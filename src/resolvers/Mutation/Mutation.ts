import { compare, hash } from "bcrypt"
import config from "../../config"
import { IContext, IDeletePost, IPost, ISignin, IUpdatePost, IUser } from "../../types"
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

    },

    updatePost: async (parent: any, args: IUpdatePost, { prisma, userInfo }: IContext) => {
        const { postId, ...rest } = args
        const isUserExists = await prisma.user.findUnique({
            where: {
                id: userInfo.userId
            }
        })

        if (!isUserExists) {
            return {
                message: "User doesn't exists",
                data: null
            }
        }

        const isPostExists = await prisma.post.findUnique({
            where: {
                id: args.postId
            }
        })

        if (!isPostExists) {
            return {
                message: "Post doesn't exists",
                data: null
            }
        }

        if (isUserExists.id !== isPostExists.authorId) {
            return {
                message: "Post doesn't exists",
                data: null
            }
        }

        const result = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                ...rest
            }
        })

        return {
            message: "Post is updated successfully",
            data: result
        }
    },

    deletePost: async (parent: any, args: IDeletePost, { prisma, userInfo }: IContext) => {
        const { postId } = args

        const isUserExists = await prisma.user.findUnique({
            where: {
                id: userInfo.userId
            }
        })

        if (!isUserExists) {
            return {
                message: "User doesn't exists",
                data: null
            }
        }

        const isPostExists = await prisma.post.findUnique({
            where: {
                id: args.postId
            }
        })

        if (!isPostExists) {
            return {
                message: "Post doesn't exists",
                data: null
            }
        }

        if (isUserExists.id !== isPostExists.authorId) {
            return {
                message: "Post doesn't exists",
                data: null
            }
        }

        const result = await prisma.post.delete({
            where: {
                id: postId
            }
        })

        return {
            message: "Post is deleted successfully",
            data: result
        }
    }

}