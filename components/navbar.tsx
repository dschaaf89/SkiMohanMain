"use client";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Facebook,Instagram } from 'lucide-react';
import React from "react";

const Navbar = () => {
  const components: { title: string; href: string }[] = [
    {
      title: "Eastside Catholic Snow Sports ",
      href: "/school-programs/eastside-catholic",
    },
    {
      title: "Ballard Snow Sports",
      href: "/school-programs/ballard",
    },
    {
      title: "Interlake Ave Snow Sports",
      href: "/school-programs/interlake",
    },
    {
      title: "Meadowbrook Snow Sports",
      href: "/school-programs/meadowbrook",
    },
    {
      title: "North East Seattle Snow Sports",
      href: "/school-programs/northeast_seattle",
    },
    {
      title: "Roosevelt Snow Sports",
      href: "/school-programs/roosevelt",
    },
    {
      title: "Soundview Snow Sports",
      href: "/school-programs/soundview",
    },
    {
      title: "Thornton Creek Snow Sports",
      href: "/school-programs/thorton-creek",
    },
    {
      title: "Wallingford Snow Sports",
      href: "/school-programs/wallingford",
    },
  ];
  const resources: { title: string; href: string }[] = [
    {
      title: "Arrival Video ",
      href: "/resources/arrival-video",
    },
    {
      title: "Equipment Guide",
      href: "/resources/equipmentguide",
    },
    {
      title: "Lift Tickets",
      href: "/resources/lifttickets",
    },
    {
      title: "Health Expectations",
      href: "/resources/healthexpectations",
    },
    {
      title: "Risk and Liability Release",
      href: "/resources/liabilityrelease",
    },
    {
      title: "Maria Jose Scholarship",
      href: "/resources/maria-jose-scholarship",
    },
    {
      title: "Operation and Refund Policy",
      href: "/resources/operationrefundpolicy",
    },
    {
      title: "Pins and ribbons",
      href: "/resources/pinsribbons",
    },
    {
      title: "FAQ's",
      href: "/resources/faq",
    },
  ];
  const staff: { title: string; href: string }[] = [
    {
      title: "Instructor ",
      href: "/school-programs/eastside-catholic",
    },
    {
      title: "Assistant",
      href: "/school-programs/ballard",
    },
    {
      title: "Volunteer",
      href: "/docs/primitives/progress",
    },
    {
      title: "Ski Term Glossary",
      href: "/docs/primitives/scroll-area",
    },
  ];
  const aboutus: { title: string; href: string }[] = [
    {
      title: "Be A Part Of Our Team ",
      href: "/school-programs/eastside-catholic",
    },
    {
      title: "Company Profile",
      href: "/school-programs/ballard",
    },
    {
      title: "Our Mission",
      href: "/docs/primitives/progress",
    },
    {
      title: "Donations",
      href: "/docs/primitives/scroll-area",
    },
    {
      title: "Founders and Past Leaders",
      href: "/docs/primitives/tabs",
    },
    {
      title: "Today's Leadership",
      href: "/docs/primitives/tabs",
    },
    {
      title: "History Timeline",
      href: "/docs/primitives/tabs",
    },
  ];

  const triggerStyle = cn(
    navigationMenuTriggerStyle(),
    "bg-gray-800 text-white"
  ); // Replace 'text-gray-200' and 'hover:text-gray-50' with the colors you want

  return (
    <nav>
    <div className="flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <a className="flex items-center justify-center md:justify-start p-6">
                <Image
                  src="/ski_mohan_logo.png" // Assuming the logo is directly inside the public folder
                  alt="Ski Mohan Logo"
                  width={120} // The width of your logo
                  height={120} // The height of your logo
                  layout="intrinsic" // Maintains the image dimensions
                />
              </a>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger><Link href="/generallessons" legacyBehavior passHref><NavigationMenuLink>General Lessons</NavigationMenuLink></Link></NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="row gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem
                  href="/generallessons/saturday"
                  title="Saturday"
                ></ListItem>
                <ListItem
                  href="/generallessons/sunday"
                  title="Sunday"
                ></ListItem>
                <ListItem
                  href="/generallessons/private-lessons"
                  title="Private Lessons"
                ></ListItem>

                <ListItem
                  href="/generallessons/seniors"
                  title="Seniors"
                ></ListItem>
                <ListItem
                  href="/generallessons/thursday-board"
                  title="Thursday Board"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Seattle School Programs
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {resources.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Staff</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {staff.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="row w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {aboutus.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  ></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contactUs" legacyBehavior passHref>
              <NavigationMenuLink>Contact Us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
          <div className="flex items-end">
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
    </div>
    </nav>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
