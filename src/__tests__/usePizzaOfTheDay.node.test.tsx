import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay";
import { Provider } from "react-redux";
import type { PropsWithChildren } from "react";
import { makeStore } from "../store";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description:
    "Salami, Pancetta, Tomatoes, Red Onions, Friggitello Peppers, Garlic",
  image: "/public/pizzas/calabrese.webp",
  sizes: { S: 12.25, M: 16.25, L: 20.25 },
};

test("to be null on initial load", () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const store = makeStore();
  const { result } = renderHook(() => usePizzaOfTheDay(), {
    wrapper: ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
  expect(result.current).toBeNull();
});

test("to call the API and give back the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const store = makeStore();
  const { result } = renderHook(() => usePizzaOfTheDay(), {
    wrapper: ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  const request = fetchMocker.mock.calls[0][0] as Request;

  expect(request.url).toContain("/api/pizza-of-the-day");
});
