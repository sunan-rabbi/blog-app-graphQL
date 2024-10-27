import { Post } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchPosts = async (ids: string[]): Promise<Post[][]> => {
    // Fetch all posts where the authorId is in the list of user IDs
    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: ids
            }
        }
    });

    // Group posts by authorId
    const postData: { [key: string]: Post[] } = {};
    posts.forEach(post => {
        if (!postData[post.authorId]) {
            postData[post.authorId] = [];
        }
        postData[post.authorId].push(post);
    });

    // Ensure the function returns an array of arrays of posts, one array for each user ID
    return ids.map(id => postData[id] || []);
};

// @ts-ignore
export const postLoader = new DataLoader<string, Post[]>(batchPosts);
