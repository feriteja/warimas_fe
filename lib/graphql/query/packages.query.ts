export const GET_PACKAGES = `
query GetPackages( $filter:PackageFilterInput, 
  $sort:PackageSortInput, 
  $page:Int, 
  $limit:Int ) {
  packages(filter:$filter, sort:$sort, page:$page, limit:$limit){ 
    items {
      id
      name
      type
      items {
        id
        variantId
        name
        price
        quantity
        imageUrl
      }
    }
    pageInfo {
      totalItems
      hasNextPage
      hasPreviousPage
    }
  }
}`;
