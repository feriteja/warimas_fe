export const ADD_TO_CART = `
 mutation AddToCart($variantId:ID!, $quantity:Int!){
  addToCart(input:
    {
      variantId:$variantId,
      quantity:$quantity
    })
  {
    success message cartItem {
      id
      userId
    }
  }
}
`;
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
