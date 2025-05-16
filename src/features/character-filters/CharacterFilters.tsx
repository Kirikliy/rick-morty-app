import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CharacterFiltersProps } from "./types";
import { CHARACTER_STATUS } from "@/entities/character/api/consts";
import { CharacterStatus } from "@/entities/character/api/types";

export const CharacterFilters: FC<CharacterFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState(filters.name ?? "");
  const [status, setStatus] = useState(filters.status ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name !== filters.name) {
        onFilterChange({ ...filters, name, page: 1 });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  const handleStatusChange = (newStatus: CharacterStatus) => {
    setStatus(newStatus);
    onFilterChange({ ...filters, status: newStatus, page: 1 });
  };

  const handleReset = () => {
    setName("");
    setStatus("");
    onFilterChange({ page: 1 });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">{t("filters.title")}</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium">
          {t("filters.name")}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("filters.namePlaceholder")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">{t("filters.status")}</label>
        <div className="flex gap-4">
          {CHARACTER_STATUS.map((option) => (
            <label key={option || "all"} className="inline-flex items-center">
              <input
                type="radio"
                checked={status === option}
                onChange={() => handleStatusChange(option)}
                className="mr-1"
              />
              {option ? t(`filters.${option.toLowerCase()}`) : t("filters.all")}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        {t("filters.reset")}
      </button>
    </div>
  );
};
