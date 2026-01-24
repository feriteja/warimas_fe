export const ADD_PACKAGE = `
mutation AddPackage($input:AddPackageInput!) {
  addPackage(input: $input){
    id name
  }
}`;
