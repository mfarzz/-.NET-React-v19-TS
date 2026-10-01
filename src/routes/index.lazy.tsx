import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-7.5 max-w-175 my-30 mx-auto px-4">
      <div className="flex flex-col">
        <h1 className="text-primary font-pacifico font-normal">Padre Gino's</h1>
        <p className="text-secondary font-bold text-[40px] uppercase max-w-78.75">Pizza & Art at a location near you</p>
      </div>
      <ul className="flex flex-col items-center justify-center list-none">
        <li className="mb-2.5 w-full sm:max-w-62.5 text-center border border-primary text-primary bg-transparent font-pacifico text-[20px] py-1.25 px-3.75 rounded-[5px] inline-block cursor-pointer">
          <Link className="w-full max-w-62.5 text-center mt-2.5 no-underline color-inherit" to="/order">Order</Link>
        </li>
        <li className="mb-2.5 w-full sm:max-w-62.5 text-center border border-primary text-primary bg-transparent font-pacifico text-[20px] py-1.25 px-3.75 rounded-[5px] inline-block cursor-pointer">
          <Link className="w-full max-w-62.5 text-center mt-2.5 no-underline color-inherit" to="/past">Past Orders</Link>
        </li>
        <li className="mb-2.5 w-full sm:max-w-62.5 text-center border border-primary text-primary bg-transparent font-pacifico text-[20px] py-1.25 px-3.75 rounded-[5px] inline-block cursor-pointer">
          <Link className="w-full max-w-62.5 text-center mt-2.5 no-underline color-inherit" to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
