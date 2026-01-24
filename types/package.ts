export interface PackageItem {
  id: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

export interface Package {
  id: string;
  name: string;
  type: "promotion" | "personal"; // String literal union based on your data
  items: PackageItem[];
}

export interface PageInfo {
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PackagesData {
  items: Package[];
  pageInfo: PageInfo;
}

export type PackageFilterInput = {
  id?: string | null;
  name?: string | null;
  type?: "promotion" | "personal" | null;
};

export type PackageSortInput = {
  field: "NAME" | "CREATED_AT";
  direction: "ASC" | "DESC";
};

export type InputPackages = {
  filter?: PackageFilterInput;
  sort?: PackageSortInput;
  limit?: number;
  page?: number;
};

export type InputAddPackages = {
  name: string;
  items: {
    variantId: string;
    quantity: number;
  }[];
  type: "personal" | "promotion";
};
