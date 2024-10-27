import { User } from "@prisma/client"
import { prisma } from ".."
import DataLoader from "dataloader"

const batchProfile = async (ids: string[]): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
    const usersData: { [key: string]: User } = {}
    users.forEach(user => {
        usersData[user.id] = user
    })
    return ids.map(id => usersData[id])

}

//@ts-ignore
export const profileLoader = new DataLoader<string, User>(batchProfile);