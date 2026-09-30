import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Cart from "../Cart";
import type {Pizza} from "../APIResponsesTypes";
import type { CartItem } from "../contexts";
import { CartContext } from "../contexts";

const testPizza: Pizza = {
  id: "pepperoni",
  name: "The Pepperoni Pizza",
  category: "Classic",
  description: "Mozzarella Cheese, Pepperoni",
  image: "/public/pizzas/pepperoni.webp",
  sizes: { S: 9.75, M: 12.5, L: 15.25 },
};

const threeItems: CartItem[] = [
  { pizza: testPizza, size: "S", price: "$9.75" },
  { pizza: testPizza, size: "M", price: "$12.50" },
  { pizza: testPizza, size: "L", price: "$15.25" },
];

test("snapshot with nothing in cart", () => {
  const { asFragment } = render(<Cart cart={[]} checkout={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test("snapshot with some stuff in cart", () => {
  const { asFragment } = render(
    <CartContext.Provider value={[threeItems, () => {}]}>
      <Cart cart={threeItems} checkout={() => {}} />
    </CartContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
