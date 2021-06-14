import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String
    bio: String
    avatar: String
    photos(lastId: Int): [Photo]
    following: [User]
    followers: [User]
    createdAt: String
    updatedAt: String
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    isFollwoing: Boolean!
  }
`;
