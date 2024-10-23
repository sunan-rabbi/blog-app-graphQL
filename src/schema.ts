export const typeDefs = `#graphql

  type Query {
    user: User
    posts: [Post]
  }

  type Profile{
    id: ID!
    bio: String!
    createdAt: String!
    updatedAt: String!
  }

  type User{
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    profile: Profile
    posts: [Post]
  }

  type Post{
    id: ID!
    title: String!
    content: String!
    author: User
    published: Boolean
    createdAt: String!
    updatedAt: String!
  }

`;