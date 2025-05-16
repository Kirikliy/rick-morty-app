import { FC, useCallback, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useGetCharactersQuery } from "@/entities/character/api/charactersApi";
import CharacterCard from "@/entities/character/ui/CharacterCard";
import { CharacterFilters } from "@/features/character-filters";
import Pagination from "@/shared/ui/Pagination";
import type { CharacterFilters as FiltersType } from "@/entities/character/api/types";

export const CharacterList: FC = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FiltersType>({ page: 1 });
  const { data, error, isLoading } = useGetCharactersQuery(filters);

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ ...filters, page });
    },
    [filters]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">{t("characters.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{t("characters.error")}</p>
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div>
        <CharacterFilters filters={filters} onFilterChange={setFilters} />
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>{t("characters.noResults")}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CharacterFilters filters={filters} onFilterChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Pagination
        currentPage={filters.page || 1}
        totalPages={data.info.pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(CharacterList);
