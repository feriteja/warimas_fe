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

export const GET_PRODUCT_DETAIL = `
  query($productID: ID!) {
    productDetail(productId: $productID) {
  	id 
    name 
    categoryName 
    categoryID 
    subcategoryName
    subcategoryID
    imageUrl
    sellerName
    variants  {id name description price imageUrl}   
  }
}
`;
