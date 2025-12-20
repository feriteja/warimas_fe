export const GET_CATEGORY = `
  query GetCategory($name: String!) {
    category(filter: $name) {
      id
      name
    }
  }
`;

export const GET_SUB_CATEGORY = `
   query GetSubCategory($name: String!, $categoryID:ID!) {
    subCategory(filter: $name, categoryID: $categoryID) {
      id
      name
    }
  }
`;
