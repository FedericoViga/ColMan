import Link from "next/link";
import { auth } from "../_lib/auth";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

async function Header() {
  const session = await auth();

  return (
    <>
      {!session ? null : (
        <header className="border-primary container flex items-center justify-between border-b !px-4 py-4">
          <div>
            <a href="/" className="text-4xl font-bold">
              <h1 className="text-primary">ColMan</h1>
            </a>
          </div>
          <div className="text-primary flex items-center gap-3">
            <Link href="/user/my-wishlist">
              <HeartIcon className="h-7 w-7 text-blue-500" />
            </Link>
            <Link href="/user">
              {session?.user?.image ? (
                <img
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  className="h-7 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserCircleIcon className="h-7 w-7"></UserCircleIcon>
              )}
            </Link>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
