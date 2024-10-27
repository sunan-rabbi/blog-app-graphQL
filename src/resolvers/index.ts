import { Mutation } from "./Mutation/Mutation";
import { Post, Profile, User } from "./middleRelation";
import { Query } from "./Query/Query";

export const resolvers = {
    Query,
    Post,
    User,
    Profile,
    Mutation
};