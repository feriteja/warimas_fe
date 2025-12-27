export enum ProductSortField {
  NAME = "NAME",
  PRICE = "PRICE",
  CREATED_AT = "CREATED_AT",
}

export type SortDirection = "ASC" | "DESC";

export type ProductSortInput = {
  field: ProductSortField;
  direction: SortDirection;
};
