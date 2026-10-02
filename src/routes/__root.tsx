import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Provider } from "react-redux";
import Header from "../pages/Header";
import PizzaOfTheDay from "../pages/PizzaOfTheDay";
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
