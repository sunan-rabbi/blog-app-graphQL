import { IContext } from "../types";

export const Post = {
    author: async (parent: any, args: any, { prisma }: IContext) => {
        return prisma.user.findUnique({
            where: {
                id: parent.authorId
            }
        })

    }
}
export const Profile = {
    user: async (parent: any, args: any, { prisma }: IContext) => {
        return prisma.user.findUnique({
            where: {
                id: parent.userId
            }
        })

    }
}

export const User = {
    posts: async (parent: any, args: any, { prisma, userInfo }: IContext) => {
        const isMyProfile = parent.id === userInfo.userId
        if (isMyProfile) {
            return prisma.post.findMany({
                where: {
                    authorId: parent.id
                }
            })
        }
        else {
            return prisma.post.findMany({
                where: {
                    authorId: parent.id,
                    published: true
                }
            })
        }
    }
}