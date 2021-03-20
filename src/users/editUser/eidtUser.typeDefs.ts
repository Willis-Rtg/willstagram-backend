import { gql } from "apollo-server-core";

export default gql`
  type editUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editUser(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): editUserResult
  }
`;
