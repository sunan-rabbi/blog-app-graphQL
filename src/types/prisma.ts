import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { IJwtDecode } from "./jwt";

export interface IContext {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    userInfo: IJwtDecode
}