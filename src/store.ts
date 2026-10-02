import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slice/cartSlice";
import { orderSlice } from "./slice/orderSlice";

const rootReducer = combineSlices(cartSlice, orderSlice);

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
