import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import anime from "../types/anime";
import character from "../types/character";

export const animeListApi = createApi({
  reducerPath: "animeListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.jikan.moe/v4",
  }),
  endpoints: (builder) => ({
    GetAnimeById: builder.query<anime, number>({
      query: (id) => `anime/${id}`,
    }),
    GetAnimeCharacters: builder.query<character, number>({
      query: (id) => `anime/${id}/characters`,
    }),
  }),
});

export const { useGetAnimeByIdQuery, useGetAnimeCharactersQuery } =
  animeListApi;
