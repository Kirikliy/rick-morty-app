import { FC } from "react";
import { useTranslation } from "react-i18next";
import CharacterList from "@/widgets/character-list";

export const CharactersPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("characters.title")}</h1>
      <CharacterList />
    </div>
  );
};
