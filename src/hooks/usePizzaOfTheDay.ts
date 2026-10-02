import { useDebugValue } from "react";
import type { Pizza } from "../types/APIResponsesTypes";
import { useGetPizzaOfTheDayQuery } from "../api/pizzaApi";

export const usePizzaOfTheDay = (): Pizza | null => {
  const { data } = useGetPizzaOfTheDayQuery();

  const pizzaOfTheDay = data ?? null;

  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  return pizzaOfTheDay;
};