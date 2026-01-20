export const UPDATE_PROFILE = `
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    fullName
    bio
    avatarUrl
    phone
    dateOfBirth
  }
}`;
