import { CharacterFilters } from "@/entities/character/api/types";

export type CharacterFiltersProps = {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
};
