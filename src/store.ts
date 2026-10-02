import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slice/cartSlice";
import { orderSlice } from "./slice/orderSlice";
import { pizzaApi, pizzaOfTheDayApi } from "./api/pizzaApi";

const rootReducer = combineSlices(
  cartSlice,
  orderSlice,
  pizzaApi,
  pizzaOfTheDayApi,
);

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        pizzaApi.middleware,
        pizzaOfTheDayApi.middleware
      ),
  });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
