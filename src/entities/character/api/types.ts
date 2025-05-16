import { CHARACTER_STATUS } from "./consts";

export type CharacterStatus = (typeof CHARACTER_STATUS)[number];

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type CharacterFilters = {
  name?: string;
  status?: CharacterStatus;
  page?: number;
};
