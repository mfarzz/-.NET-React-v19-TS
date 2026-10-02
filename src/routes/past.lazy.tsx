import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import getPastOrders from "../api/getPastOrders";
import ErrorBoundary from "../pages/ErrorBoundary";
import Modal from "../pages/Modal";
import { useQuery } from "@tanstack/react-query";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetPastOrderQuery, useGetPastOrdersQuery } from "../api/pizzaApi";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState<number>();
  const { data: pastOrderData, isLoading: isLoadingPastOrder } =
    useGetPastOrderQuery(focusedOrder ?? skipToken);

  const {
    data: pastOrdersData,
    isLoading: isLoadingPastOrders,
    isFetching: isFetchingPastOrders,
  } = useGetPastOrdersQuery(page ?? skipToken);

  const isLoadingOrders = isLoadingPastOrders || isFetchingPastOrders;

  if (isLoadingOrders) {
    return (
      <div className="min-h-162.5 max-w-225 w-[90%] my-0 mx-auto">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if (!pastOrdersData) {
    throw new Error("Past orders could not be loaded");
  }
  return (
    <div className="min-h-162.5 max-w-225 w-[90%] my-0 mx-auto">
      <table className="w-full border-collapse my-6.25 mx-0 text-[0.9em] font-sans min-w-100 border border-[#dddddd]">
        <thead>
          <tr className="bg-secondary text-white text-left">
            <td className="py-3 px-3.75 text-center">ID</td>
            <td className="py-3 px-3.75 text-center">Date</td>
            <td className="py-3 px-3.75 text-center">Time</td>
          </tr>
        </thead>
        <tbody>
          {pastOrdersData.map((order) => (
            <tr
              className="border-b border-[#dddddd] even:bg-[#f6fef0] last-of-type:border-b-2 last-of-type:border-secondary"
              key={order.order_id}
            >
              <td className="py-3 px-3.75 text-center">
                <button
                  className="btn"
                  onClick={() => setFocusedOrder(order.order_id)}
                >
                  {order.order_id}
                </button>
              </td>
              <td className="py-3 px-3.75 text-center">{order.date}</td>
              <td className="py-3 px-3.75 text-center">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-evenly">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <div className="font-pacifico text-primary text-[20px]">{page}</div>
        <button
          className="btn"
          disabled={pastOrdersData?.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table className="w-full border-collapse my-6.25 mx-0 text-[0.9em] font-sans min-w-100 border border-[#dddddd]">
              <thead>
                <tr className="bg-secondary text-white text-left">
                  <td className="py-3 px-3.75 text-center">Image</td>
                  <td className="py-3 px-3.75 text-center">Name</td>
                  <td className="py-3 px-3.75 text-center">Size</td>
                  <td className="py-3 px-3.75 text-center">Quantity</td>
                  <td className="py-3 px-3.75 text-center">Price</td>
                  <td className="py-3 px-3.75 text-center">Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData?.orderItems.map((pizza) => (
                  <tr
                    className="border-b border-[#dddddd] even:bg-[#f6fef0] last-of-type:border-b-2 last-of-type:border-secondary"
                    key={`${pizza.pizzaTypeId}_${pizza.size}`}
                  >
                    <td className="py-3 px-3.75 text-center">
                      <img
                        className="w-12.5"
                        src={pizza.image}
                        alt={pizza.name}
                      />
                    </td>
                    <td className="py-3 px-3.75 text-center">{pizza.name}</td>
                    <td className="py-3 px-3.75 text-center">{pizza.size}</td>
                    <td className="py-3 px-3.75 text-center">
                      {pizza.quantity}
                    </td>
                    <td className="py-3 px-3.75 text-center">
                      {intl.format(pizza.price)}
                    </td>
                    <td className="py-3 px-3.75 text-center">
                      {intl.format(pizza.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button className="btn" onClick={() => setFocusedOrder(undefined)}>
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}
