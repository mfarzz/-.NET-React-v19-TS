import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { PizzaSize, Pizza as PizzaType } from "../APIResponsesTypes";
import Cart from "../Cart";
import Pizza from "../Pizza";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart, clearCart, selectCartItems } from "../slice/cartSlice";
import {
  setPizzaType,
  setPizzaSize,
  selectPizzaType,
  selectPizzaSize,
  clearOrder
} from "../slice/orderSlice";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState<PizzaType[]>([]);
  const [loading, setLoading] = useState(true);
  const cart = useAppSelector(selectCartItems);
  const pizzaType = useAppSelector(selectPizzaType);
  const pizzaSize = useAppSelector(selectPizzaSize);

  const dispatch = useAppDispatch();

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });
    dispatch(clearOrder());
    dispatch(clearCart());
    setLoading(false);
  }

  let price: string | undefined;
  let selectedPizza: PizzaType | undefined;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = selectedPizza
      ? intl.format(selectedPizza.sizes[pizzaSize])
      : undefined;
  }

  useEffect(() => {
    void fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    const pizzasRes = await fetch("/api/pizzas");
    const pizzasJson = (await pizzasRes.json()) as PizzaType[];
    setPizzaTypes(pizzasJson);
    setLoading(false);
  }

  const handlePizzaSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPizzaSize(e.target.value as PizzaSize));
  };

  return (
    <div className="max-w-325 m-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12.5">
      <div className="w-full lg:ml-[5%]">
        <h2>Create Order</h2>
        <form
          className="flex flex-col md:flex-row md:justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            if (!selectedPizza || !price) {
              return;
            }
            dispatch(
              addToCart({ pizza: selectedPizza, size: pizzaSize, price }),
            );
          }}
        >
          <div className="my-2.5 text-center w-full p-3.75 border-b border-border md:border-r md:border-b-0">
            <div className="text-center w-full p-3.75">
              <label
                className="block text-[20px] text-secondary mb-2.5"
                htmlFor="pizza-type"
              >
                Pizza Type
              </label>
              <select
                className="form-select block text-[16px] p-1.25 w-full"
                onChange={(e) => dispatch(setPizzaType(e.target.value))}
                name="pizza-type"
                value={pizzaType}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2.5 text-center w-full p-3.75">
              <label
                className="block text-[20px] text-secondary mb-2.5"
                htmlFor="pizza-size"
              >
                Pizza Size
              </label>
              <div className="my-2.5 text-center">
                <span>
                  <input
                    className="peer hidden"
                    onChange={handlePizzaSizeChange}
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                  />
                  <label
                    className="h-20 w-20 border border-[#999] bg-border text-[#999] inline-flex items-center justify-center rounded-[5px] cursor-pointer mx-3.75 mt-0 mb-2.5 peer-checked:bg-white peer-checked:text-[#333] peer-checked:border-[#333]"
                    htmlFor="pizza-s"
                  >
                    Small
                  </label>
                </span>
                <span>
                  <input
                    className="peer hidden"
                    onChange={handlePizzaSizeChange}
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                  />
                  <label
                    className="h-20 w-20 border border-[#999] bg-border text-[#999] inline-flex items-center justify-center rounded-[5px] cursor-pointer mx-3.75 mt-0 mb-2.5 peer-checked:bg-white peer-checked:text-[#333] peer-checked:border-[#333]"
                    htmlFor="pizza-m"
                  >
                    Medium
                  </label>
                </span>
                <span>
                  <input
                    className="peer hidden"
                    onChange={handlePizzaSizeChange}
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                  />
                  <label
                    className="h-20 w-20 border border-[#999] bg-border text-[#999] inline-flex items-center justify-center rounded-[5px] cursor-pointer mx-3.75 mt-0 mb-2.5 peer-checked:bg-white peer-checked:text-[#333] peer-checked:border-[#333]"
                    htmlFor="pizza-l"
                  >
                    Large
                  </label>
                </span>
              </div>
            </div>
            <button className="btn" type="submit" >
              Add to Cart
            </button>
          </div>
          {loading || !selectedPizza ? (
            <h3>LOADING …</h3>
          ) : (
            <div className="w-full my-2.5 p-3.75 text-center">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? (
        <h2>LOADING …</h2>
      ) : (
        <Cart checkout={() => void checkout()} cart={cart} />
      )}
    </div>
  );
}
