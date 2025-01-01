export type FilterOption = {
  key: string;
  label: string;
  isSelected: boolean;
};

export type FilterItem = {
  key: string;
  label: string;
  values: FilterOption[];
};
