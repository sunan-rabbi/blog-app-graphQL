export const typeDefs = `#graphql

  type Query {

    me(email:String!): User
    profile(email:String!): Profile
    users: [User]
    posts: [Post]

  }

  type Mutation {

    signup(
        name: String!
        email: String!
        password: String!
        bio: String!
        ):User

    signin(
        email: String!
        password: String!
    ):LoginResponse

    addPost(
      title: String!
      content: String!
    ):PostResponse

    updatePost(
      postId:String!
      title: String
      content: String
    ):PostResponse

    deletePost(
      postId:String!
    ):PostResponse

  }

  type PostResponse{
    message:String
    data:Post
  }

  type LoginResponse{
    message:String
    token:String
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