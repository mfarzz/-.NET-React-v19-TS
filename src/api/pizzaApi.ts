import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pizza } from "../types/APIResponsesTypes";

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    getPizzas: build.query<Pizza[], void>({
      query: () => "pizzas",
    }),
  }),
});

export const pizzaOfTheDayApi = createApi({
  reducerPath: "pizzaOfTheDayApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    getPizzaOfTheDay: build.query<Pizza, void>({
      query: () => "pizza-of-the-day",
    }),
  }),
});

export const { useGetPizzasQuery } = pizzaApi;
export const { useGetPizzaOfTheDayQuery } = pizzaOfTheDayApi;