export const GET_PROFILE = `
query MyProfile {
  myProfile {
    id userId fullName bio avatarUrl email phone dateOfBirth createdAt updatedAt
  }
}`;
