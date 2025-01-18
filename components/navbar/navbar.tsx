"use client";

import {
  MapPinIcon as OMapPinIcon,
  HomeIcon as OHomeIcon,
  UserIcon as OUserIcon,
} from "@heroicons/react/24/outline";
import {
  MapPinIcon as SMapPinIcon,
  HomeIcon as SHomeIcon,
  UserIcon as SUserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <footer className="flex items-center justify-center gap-10 w-full pb-5 h-[80px] bg-black">
      <a href="/protected/map">
        {pathname === "/protected/map" ? (
          <SMapPinIcon className="w-8" />
        ) : (
          <OMapPinIcon className="w-8" />
        )}
      </a>
      <a href="/protected/feed">
        {pathname === "/protected/feed" ? (
          <SHomeIcon className="w-8" />
        ) : (
          <OHomeIcon className="w-8" />
        )}
      </a>
      <a href="/protected/profile">
        {pathname === "/protected/profile" ? (
          <SUserIcon className="w-8" />
        ) : (
          <OUserIcon className="w-8" />
        )}
      </a>
    </footer>
  );
}
