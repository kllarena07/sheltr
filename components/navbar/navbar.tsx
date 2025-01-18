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
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [path, setPath] = useState("feed");

  return (
    <footer className="flex items-center justify-center gap-10 w-full pb-5 h-[80px] bg-black">
      <Link href="/protected/map" onClick={() => setPath("map")}>
        {path === "map" ? (
          <SMapPinIcon className="w-8" />
        ) : (
          <OMapPinIcon className="w-8" />
        )}
      </Link>
      <Link href="/protected/feed" onClick={() => setPath("feed")}>
        {path === "feed" ? (
          <SHomeIcon className="w-8" />
        ) : (
          <OHomeIcon className="w-8" />
        )}
      </Link>
      <Link href="/protected/profile" onClick={() => setPath("profile")}>
        {path === "profile" ? (
          <SUserIcon className="w-8" />
        ) : (
          <OUserIcon className="w-8" />
        )}
      </Link>
    </footer>
  );
}
