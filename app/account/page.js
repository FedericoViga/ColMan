import Link from "next/link";
import { createClient } from "../_lib/supabase/server";

import { countWishlistGames } from "../_lib/data-service";
import { HeartIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Account",
};

async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth?.getUser();

  const displayName =
    "full_name" ||
    "name" ||
    "preferred_username" ||
    "user_name" ||
    "email" ||
    null;

  const myWishlistCount = await countWishlistGames();

  return (
    <div className="container my-5 flex flex-col items-center gap-1">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-3">
        <h1 className="max-w-9/12 text-2xl wrap-break-word">
          {user?.user_metadata[displayName]}
        </h1>
        <h2 className="text-secondary text-sm">{user?.user_metadata?.email}</h2>
      </div>

      <Link href="/wishlist" className="flex items-center gap-1 text-xl">
        <HeartIcon className="text-accent h-6 w-6" />
        <span>La mia wishlist </span>
        <span className="text-subtle text-sm">({myWishlistCount} giochi)</span>
      </Link>
    </div>
  );
}

export default Page;
