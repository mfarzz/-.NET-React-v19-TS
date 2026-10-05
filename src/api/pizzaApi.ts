import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pizza, PastOrderDetail, PastOrder, Contact } from "../types/APIResponsesTypes";
import type { CartItem } from "../slice/cartSlice";

export const pizzaApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["PastOrders"],
  endpoints: (build) => ({
    getPizzas: build.query<Pizza[], void>({
      query: () => "pizzas",
    }),
    getPizzaOfTheDay: build.query<Pizza, void>({
      query: () => "pizza-of-the-day",
    }),
    getPastOrder: build.query<PastOrderDetail, number>({
      query: (order) => `past-order/${order}`,
      keepUnusedDataFor: 24 * 60 * 60,
    }),
    getPastOrders: build.query<PastOrder[], number>({
      query: (page) => `past-orders?page=${page}`,
    }),
    placeOrder: build.mutation<unknown, CartItem[]>({
      query: (cart) => ({
        url: "order",
        method: "POST",
        body: { cart },
      }),
      invalidatesTags: ["PastOrders"],
    }),
    placeContact: build.mutation<unknown, Contact>({
      query: (contact) => ({
        url: "contact",
        method: "POST",
        body: contact,
      }),
    })
  }),
});

export const {
  useGetPizzasQuery,
  useGetPizzaOfTheDayQuery,
  useGetPastOrderQuery,
  useGetPastOrdersQuery,
  usePlaceOrderMutation,
  usePlaceContactMutation,
} = pizzaApi;
