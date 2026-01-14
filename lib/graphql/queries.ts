export const GET_CATEGORY = `
  query Category ($filter:String ,$limit:Int, $page:Int ) {
  category (filter:$filter,limit:$limit, page:$page) {
   items{ id name 
    subcategories{
      id name
    }}
    pageInfo {
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

export const GET_SUB_CATEGORY = `
query Subcategory ($categoryId:ID!,$filter:String ,$limit:Int, $page:Int  ) {
  subcategory(categoryID:$categoryId, filter:$filter,limit:$limit, page:$page) {
    items{id  categoryID name }
    pageInfo {
      totalItems
      totalPages
      page
      limit
      hasNextPage
      hasPreviousPage
    }
  }
}`;

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
    variants  {id name description price imageUrl stock}   
  }
}
`;

export const GET_CART_LIST = `
  query MyCart($limit:Int, $page:Int){
  myCart(
    limit:$limit,page:$page) {
    id 
    product{id status name sellerId categoryID 
      variant{id name price  stock}
    } 
    createdAt quantity
  }
}
`;

export const GET_CHECKOUT_SESSION_DATA = `
query GetSessionData ($externalId: String!) {
  checkoutSession (externalId: $externalId) {
    id externalId status expiresAt createdAt addressId shippingFee
    items { id variantName productName quantity quantityType price}
  }
}`;

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

export const GET_PAYAMENT_ORDER_INFO = `
query PaymentOrderInfo($externalId: String!) {
  paymentOrderInfo(externalId:$externalId){
    status 
    expiresAt
    totalAmount
    currency
    shippingAddress{name receiverName phone address1 city province postalCode} 
    payment{method bank instructions paymentCode instructions referenceId}
  }
}`;

export const GET_ORDER_LIST = `
query OrderList($filter: OrderFilterInput, $sort:OrderSortInput, $pagination: PaginationInput) {
  orderList( filter:$filter, sort:$sort, pagination:$pagination) {
    pageInfo {
      totalItems
      totalPages
      page
      limit
      hasNextPage
    }
    items {
      id
      externalId
      invoiceNumber
      status
      user {
        id
      }
      pricing {
        currency
        subtotal
        total
        tax
        discount
        shippingFee
        
      }
      items {
        id
        quantity
        quantityType
        pricing {price subtotal}
        variant {
          id
          name
          productName
          imageUrl
        }
      }
      shipping {
        address {
          id
          receiverName
          name
        }
      }
      timestamps {
        createdAt
        updatedAt
      }
    }
  }
}`;

export const GET_ORDER_DETAIL = `
query OrderDetailByExternalId($externalId: ID!) {
  orderDetailByExternalId(externalId: $externalId) {
    id
    externalId
    invoiceNumber
    status
    items {
      id
      quantity
      quantityType
      variant {
        id
        name
        productName
        imageUrl
      }
      pricing {
        price
        subtotal
      }
    }
    user {
      id
    }
    pricing {
      currency
      subtotal
      tax
      discount
      shippingFee
      total
    }
    shipping {
      address {
        id
        name
        receiverName
        phone
        addressLine1
        addressLine2
        city
        province
        country
        postalCode
      }
    }
  }
}`;
