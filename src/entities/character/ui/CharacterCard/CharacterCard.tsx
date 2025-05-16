import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { CharacterCardProps } from "./types";
import PAGES from "@/app/consts/pages";

export const CharacterCard: FC<CharacterCardProps> = ({ character }) => (
  <Link
    to={PAGES.characters.view.replace(":id", String(character.id))}
    className="block"
  >
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        loading="lazy"
        src={character.image}
        alt={character.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{character.name}</h2>
        <div className="flex items-center mb-2">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              character.status === "Alive"
                ? "bg-green-500"
                : character.status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          />
          <span>
            {character.status} - {character.species}
          </span>
        </div>
        <div className="text-gray-600">
          <p className="mb-1">
            <span className="font-semibold">Gender:</span> {character.gender}
          </p>
          <p className="truncate">
            <span className="font-semibold">Origin:</span>{" "}
            {character.origin.name}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default memo(CharacterCard);
