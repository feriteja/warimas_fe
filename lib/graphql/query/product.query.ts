export const GET_PRODUCT_LIST = `
query ProductList(
  $filter:ProductFilterInput, 
  $sort:ProductSortInput, 
  $page: Int,
  $limit:Int
){
  productList(filter:$filter, limit:$limit, page:$page, sort:$sort){
    page
    limit
    totalCount
    hasNext
    
   items { id name sellerId sellerName status
    variants { id name price } 
    description 
    imageUrl
    subcategoryID 
    subcategoryName 
    categoryName 
    categoryID
    createdAt
    updatedAt
  	    }
    }
}
`;

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
    variants  {id name description price imageUrl stock}   
  }
}
`;
