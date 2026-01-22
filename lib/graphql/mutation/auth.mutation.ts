export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
     token user{
      role id 
      }
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

export const LOGOUT_MUTATION = ` 
mutation Logout {
  logout
}`;
