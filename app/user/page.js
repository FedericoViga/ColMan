import Link from "next/link";
import { auth } from "../_lib/auth";
import { countWishlistGames } from "../_lib/data-service";
import { HeartIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Utente",
};

async function Page() {
  const session = await auth();
  const email = session?.user?.email;
  const myWishlistCount = await countWishlistGames(email);

  return (
    <div className="container my-5 flex flex-col items-center gap-1">
      <h1 className="text-center text-2xl">{session.user.name}</h1>

      <h2 className="text-primary mb-10 text-center text-sm">
        {session.user.email}
      </h2>

      <Link
        href="/user/my-wishlist"
        className="flex items-center gap-1 text-lg"
      >
        <HeartIcon className="h-5 w-5 text-blue-500" />
        <span>La mia wishlist </span>
        <span className="text-primary text-sm">({myWishlistCount} giochi)</span>
      </Link>
    </div>
  );
}

export default Page;
