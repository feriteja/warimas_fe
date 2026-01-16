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

export const UPDATE_CART_LIST = `
 mutation UpdateCart2 ($variantId:ID!, $quantity:Int!){
    updateCart(input:
      {variantId:$variantId, quantity:$quantity}){
      success
  	}
	}`;

export const DELETE_CART_LIST = `  
mutation RemoveFromCart($variantIds:[ID!]!) {
  removeFromCart(variantIds:$variantIds){
    success
  }
}
`;
