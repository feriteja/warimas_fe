export const GET_CART_LIST = `
 query MyCart($sort:CartSortInput, $limit:Int, $page:Int) {
  myCart(sort:$sort, limit:$limit, page:$page) {
 
    items{
      id
      userId
      quantity
      createdAt
      product {
        id name sellerId sellerName 
        categoryID categoryName subcategoryID
        subcategoryName slug  imageUrl status 
        variant 
        	{ id productId quantityType price stock  imageUrl sellerId}
      }
    }
    pageInfo{
      totalItems
      totalPages
      page
      limit
      hasNextPage
      hasPreviousPage
    }
  }
}
`;
