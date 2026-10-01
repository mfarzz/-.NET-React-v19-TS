import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext);
  return (
    <nav className="w-full grid grid-cols-5 [grid-template-areas:'.__logo_logo_logo_cart'] border-b border-border" >
      <Link className="[grid-area:logo] flex items-center justify-center no-underline" to={"/"}>
        <h1 className="h-27.5 bg-left bg-no-repeat border-b border-border bg-[url('/public/padre_gino.svg')] bg-contain text-transparent text-3xl">Padre Gino's Pizza</h1>
      </Link>
      <div className="[grid-area:cart] flex items-center justify-center text-[40px]">
        🛒
        <span data-testid="cart-number" className="relative -top-4.25 -left-4.25 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[18px] text-white">
          {cart.length}
        </span>
      </div>
    </nav>
  );
}
