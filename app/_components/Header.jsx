"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function Header() {
  const pathName = usePathname();

  return (
    <>
      {pathName !== "/login" && (
        <header className="border-line container flex items-center justify-between border-b px-4! py-4">
          <div>
            <a href="/" className="text-4xl font-bold">
              <h1 className="text-secondary">ColMan</h1>
            </a>
          </div>
          <div className="text-secondary flex items-center gap-3">
            <Link href="/wishlist">
              <HeartIcon className="text-accent h-7 w-7" />
            </Link>
            <Link href="/account">
              <UserCircleIcon className="text-subtle h-7 w-7"></UserCircleIcon>
            </Link>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
