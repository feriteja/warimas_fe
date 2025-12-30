export const ADD_CATEGORY = `
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`;

export const ADD_SUB_CATEGORY = `
  mutation AddSubCategory($categoryID: ID!, $name: String!) {
    addSubCategory(categoryID: $categoryID, name: $name) {
      id
      name
    }
  }
`;

export const ADD_PRODUCT = `
  mutation AddProduct($input: NewProduct!) {
    createProduct(input: $input) {
      id
      name
    }
  }
`;

export const ADD_PRODUCT_VARIANT = `
 mutation CreateVariants($input: [NewVariant!]!) {
  createVariants(input: $input) {
    id
    name
    productId
    quantityType
    price
    stock
    imageUrl
    subcategoryID
    sellerId
    createdAt
  }
}
`;

export const ADMIN_GET_PRODUCT_LIST = `query($filter: ProductFilterInput, $sort: ProductSortInput, $limit: Int, $page: Int) {
  productList(filter: $filter, sort: $sort, limit: $limit, page: $page) {
    page
    limit
    totalCount
    hasNext

   items { id 
    name 
    sellerId
    sellerName
    status
    variants { id name price} 
    description 
    subcategoryID 
    subcategoryName 
    categoryName 
    categoryID
    createdAt
    updatedAt}
    
    }
  }`;

export const GET_PRODUCT_HOME_LIST = `query{
 productsHome{
  CategoryName Products{
    id name variants{id name price stock imageUrl} description categoryName subcategoryName
      }
    }
  }`;
