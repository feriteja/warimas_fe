export const GET_ADDRESSES = `
query GetAddresses {
  addresses{
    id
    name
    phone
    addressLine1
    addressLine2
    city
    province
    postalCode
    country
    isDefault
  }
}`;

export const GET_ADDRESS = `
query GetAddress($AddressID: ID!) {
  address(addressId:$AddressID){
    id 
    name
    phone
    addressLine1
    addressLine2
    city
    province
    postalCode
    country
    isDefault
  }
}`;
