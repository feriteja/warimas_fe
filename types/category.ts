export type CategoryType = {
  id: string;
  name: string;
};

export type SubCategoryType = {
  id: string;
  categoryId: string;
  name: string;
};
