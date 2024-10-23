import { IContext, IUser } from "../../types";

export const Query = {

    users: async (parent: any, args: any, { prisma }: IContext) => {
        return await prisma.user.findMany()
    },

    posts: async (parent: any, args: IUser, { prisma }: IContext) => {
        return await prisma.post.findMany()
    },

    me: async (parent: any, args: { email: string }, { prisma }: IContext) => {
        return await prisma.user.findUnique({
            where: {
                email: args.email
            }
        })
    },

    profile: async (parent: any, args: { email: string }, { prisma }: IContext) => {
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



}