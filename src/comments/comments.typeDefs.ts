// import { gql } from "@apollo/client";
import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: ID!
    user: User!
    photo: Photo!
    payload: String!
    isMine: Boolean!
    hashtag: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
`;
