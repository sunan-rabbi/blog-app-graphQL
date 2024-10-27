import { postLoader } from "../dataLoader/post.dataloader";
import { profileLoader } from "../dataLoader/profile.dataloader";
import { userLoader } from "../dataLoader/user.dataloader";
import { IContext } from "../types";

export const Post = {
    author: async (parent: any, args: any, { prisma }: IContext) => {
        return userLoader.load(parent.authorId)

    }
}
export const Profile = {
    user: async (parent: any, args: any, { prisma }: IContext) => {
        return profileLoader.load(parent.userId)
    }
}

export const User = {
    posts: async (parent: any, args: any, { prisma, userInfo }: IContext) => {
        const isMyProfile = parent.id === userInfo.userId;

        const allPosts = await postLoader.load(parent.id);

        return isMyProfile ? allPosts : allPosts.filter(post => post.published);
    }
}