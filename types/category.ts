export interface Subcategory {
  id: string;
  name: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface PageInfo {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CategoryData {
  items: CategoryItem[];
  pageInfo: PageInfo;
}

export interface SubCategoryData {
  items: Subcategory[];
  pageInfo: PageInfo;
}
