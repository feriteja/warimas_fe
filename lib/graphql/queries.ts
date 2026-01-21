export const GET_CATEGORY = `
  query Category ($filter:String ,$limit:Int, $page:Int ) {
  category (filter:$filter,limit:$limit, page:$page) {
   items{ id name slug
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

export const GET_CHECKOUT_SESSION_DATA = `
query GetSessionData ($externalId: String!) {
  checkoutSession (externalId: $externalId) {
    id externalId status expiresAt createdAt addressId shippingFee paymentMethod
    items { id variantName productName quantity quantityType price}
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
    payment{method bank instructions paymentCode instructions referenceId invoiceURL}
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
          addressLine1
          city
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
    timestamps {
    createdAt
    updatedAt
  }
 }
}`;

export const UPDATE_ORDER_STATUS = `
mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
  updateOrderStatus(input: { orderId: $orderId, status:  $status}) {
    success
    message
  }
}`;
