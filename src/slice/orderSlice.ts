import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PizzaSize } from "../APIResponsesTypes";

interface OrderState {
    pizzaType: string;
    pizzaSize: PizzaSize;
}

const initialState: OrderState = {
    pizzaType: "pepperoni",
    pizzaSize: "M",
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setPizzaType(state, action: PayloadAction<string>) {
            state.pizzaType = action.payload;
        },
        setPizzaSize(state, action: PayloadAction<PizzaSize>) {
            state.pizzaSize = action.payload;
        },
        clearOrder(state) {
            state.pizzaType = initialState.pizzaType;
            state.pizzaSize = initialState.pizzaSize;
        }
    },
    selectors: {
        selectPizzaType: (order) => order.pizzaType,
        selectPizzaSize: (order) => order.pizzaSize,
    }
})

export const { setPizzaType, setPizzaSize, clearOrder } = orderSlice.actions;
export const { selectPizzaType, selectPizzaSize } = orderSlice.selectors;