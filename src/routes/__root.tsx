import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { Provider } from "react-redux";
import { store } from "../store";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Provider store={store}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </Provider>
      </>
    );
  },
});
