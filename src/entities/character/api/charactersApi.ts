import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/app/store/utils";
import { Character, CharactersResponse, CharacterFilters } from "./types";
import ENV from "@/app/consts/env";
import ENDPOINTS from "@/app/consts/endpoints";

export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: axiosBaseQuery({
    baseURL: ENV.rmApiUrl,
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, CharacterFilters>({
      query: (filters) => ({
        url: ENDPOINTS.characters.get,
        method: "GET",
        params: filters,
      }),
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => ({
        url: ENDPOINTS.characters.getById.replace(":id", String(id)),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  charactersApi;
