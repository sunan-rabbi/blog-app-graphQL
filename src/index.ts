import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema'
import { resolvers } from './resolvers/index'
import { PrismaClient } from '@prisma/client';
import { IContext } from './types';
import { jwtDecode } from './utils/jwtHelper';

const prisma = new PrismaClient()

const main = async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }): Promise<IContext> => {
            const userInfo = await jwtDecode(req.headers.authorization as string)
            return {
                prisma,
                userInfo
            }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
}

main()