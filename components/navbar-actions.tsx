"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Facebook,Instagram } from 'lucide-react';
import Button from "@/components/ui/buttons";
import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>

      <NavigationMenu>
        <NavigationMenuItem className=" flex justify-end items-center space-x-4 mr-6 pl-5" > 
            <Link href="https://www.facebook.com/SkiMohan/" legacyBehavior passHref>
              <NavigationMenuLink><Facebook/></NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className=" flex justify-end items-center space-x-4 mr-6 ">
            <Link href="https://www.instagram.com/skimohan/" legacyBehavior passHref>
              <NavigationMenuLink><Instagram/></NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          </NavigationMenu>
    </div>
  );
}
 
export default NavbarActions;