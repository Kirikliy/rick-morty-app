import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useGetCharacterByIdQuery } from "@/entities/character/api/charactersApi";
import { RouteParams } from "./types";
import PAGES from "@/app/consts/pages";

export const CharacterDetails: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<RouteParams>();
  const {
    data: character,
    isLoading,
    error,
  } = useGetCharacterByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">{t("characterDetails.loading")}</div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{t("characterDetails.error")}</p>
        <Link
          to={PAGES.main}
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          {t("common.backToCharacters")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover md:w-48"
          />
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {character.name}
              </h1>
              <div className="flex items-center mb-4">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    character.status === "Alive"
                      ? "bg-green-500"
                      : character.status === "Dead"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                />
                <span className="text-lg">
                  {character.status} - {character.species}
                </span>
              </div>
            </div>
            <Link to="/" className="text-blue-500 hover:underline">
              {t("common.backToList")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {t("characterDetails.details")}
              </h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">
                    {t("characterDetails.gender")}:
                  </span>{" "}
                  {character.gender}
                </li>
                <li>
                  <span className="font-medium">
                    {t("characterDetails.type")}:
                  </span>{" "}
                  {character.type || t("characterDetails.unknown")}
                </li>
                <li>
                  <span className="font-medium">
                    {t("characterDetails.species")}:
                  </span>{" "}
                  {character.species}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                {t("characterDetails.origin")}
              </h2>
              <p>{character.origin.name}</p>

              <h2 className="text-xl font-semibold mt-4 mb-2">
                {t("characterDetails.location")}
              </h2>
              <p>{character.location.name}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              {t("characterDetails.episodes")}
            </h2>
            <p>
              {character.episode.length}{" "}
              {t("characterDetails.episode", {
                count: character.episode.length,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CharacterDetails);
