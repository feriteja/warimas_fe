export const CREATE_ADDRESS = `
mutation CreateAddAddress($createAddressInput: CreateAddressInput!) {
  createAddress(input:$createAddressInput)
  {
    address {
      id name
    }
  }
}`;
