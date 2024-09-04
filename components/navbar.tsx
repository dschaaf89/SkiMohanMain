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
import { Facebook, Instagram } from "lucide-react";
import React from "react";
import NavbarActions from "@/components/navbar-actions";
import { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
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
      href: "/staff/instructor",
    },
    {
      title: "Assistant",
      href: "/staff/assistant",
    },
    {
      title: "Volunteer",
      href: "/staff/volunteer",
    },
    {
      title: "Ski Term Glossary",
      href: "/staff/ski-term-glossary",
    },
  ];
  const aboutus: { title: string; href: string }[] = [
    {
      title: "Be A Part Of Our Team",
      href: "/staff",
    },
    {
      title: "Company Profile",
      href: "/aboutus/company-profile",
    },
    {
      title: "Our Mission",
      href: "/aboutus/our-mission",
    },
    {
      title: "Donations",
      href: "/aboutus/donations",
    },
    {
      title: "Founders and Past Leaders",
      href: "/aboutus/our-leadership",
    },
    {
      title: "Today's Leadership",
      href: "/aboutus/todays-leadership",
    },
    {
      title: "History Timeline",
      href: "/aboutus/timeline",
    },
  ];

  const triggerStyle = cn(
    navigationMenuTriggerStyle(),
    "bg-gray-800 text-white"
  ); // Replace 'text-gray-200' and 'hover:text-gray-50' with the colors you want

  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" legacyBehavior passHref>
          <a className="flex items-center">
            <Image
              src="/ski_mohan_logo.png"
              alt="Ski Mohan Logo"
              width={50}
              height={50}
              className="mr-2"
            />
          </a>
        </Link>
        <div className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link href="/generallessons"> {/* This ensures clicking General Lessons goes to /generallessons */}
      <NavigationMenuTrigger>General Lessons</NavigationMenuTrigger>
    </Link>
  </NavigationMenuLink>
  <NavigationMenuContent>
    <ul className="grid grid-cols-2 gap-3 p-4 w-80">
      <ListItem href="/generallessons/saturday" title="Saturday"></ListItem>
      <ListItem href="/generallessons/sunday" title="Sunday"></ListItem>
      <ListItem href="/generallessons/private-lessons" title="Private Lessons"></ListItem>
      <ListItem href="/generallessons/seniors" title="Seniors"></ListItem>
      <ListItem href="/generallessons/thursday-board" title="Thursday Board"></ListItem>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Seattle School Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-3 p-4 w-80">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-3 p-4 w-80">
                    {resources.map((resource) => (
                      <ListItem
                        key={resource.title}
                        title={resource.title}
                        href={resource.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Staff</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-3 p-4 w-80">
                    {staff.map((member) => (
                      <ListItem
                        key={member.title}
                        title={member.title}
                        href={member.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-3 p-4 w-80">
                    {aboutus.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contactUs">Contact Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <NavbarActions />
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden">
          <ul className="space-y-4 p-4 bg-white text-black">
            <li>
              <NavigationMenu orientation="vertical">
                <NavigationMenuList className="flex flex-col space-y-3">
                  <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      General Lessons
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="space-y-3 p-4 bg-white text-black">
                        <ListItem
                          href="/generallessons"
                          title="General Lessons"
                        ></ListItem>
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
                      <ul className="space-y-3 p-4 bg-white text-black">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="space-y-3 p-4 bg-white text-black">
                        {resources.map((resource) => (
                          <ListItem
                            key={resource.title}
                            title={resource.title}
                            href={resource.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Staff</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="space-y-3 p-4 bg-white text-black">
                        {staff.map((member) => (
                          <ListItem
                            key={member.title}
                            title={member.title}
                            href={member.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="space-y-3 p-4 bg-white text-black">
                        {aboutus.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contactUs">Contact Us</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
          </ul>
        </div>
      )}
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
