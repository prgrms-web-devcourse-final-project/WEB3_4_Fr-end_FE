import Link from "next/link";
import { Button } from "../ui/button";
import { LucideShoppingCart } from "lucide-react";

export default async function CartButton() {
  //temp
  const numItemsInCart = 9;

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <LucideShoppingCart />
        <span
          className="absolute -top-3 -right-3 bg-primary text-white rounded-full
        h-6 w-6 flex items-center justify-center text-xs"
        >
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
