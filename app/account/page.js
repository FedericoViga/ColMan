import Link from "next/link";
import { countWishlistGames } from "../_lib/data-service";
import { HeartIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Account",
};

export const revalidate = 0;

async function Page() {
  const myWishlistCount = await countWishlistGames();

  return (
    <div className="container my-5 flex flex-col items-center gap-1">
      {/*       <div className="mb-7 flex items-center justify-center gap-3">
         <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className="mt-1.5 h-12 rounded-full"
        />

        <div className="text-left">
          <h1 className="text-2xl">{session?.user?.name}</h1>
          <h2 className="text-primary text-sm">{session?.user?.email}</h2>
        </div>
      </div> */}

      <Link href="/wishlist" className="flex items-center gap-1 text-xl">
        <HeartIcon className="text-accent h-6 w-6" />
        <span>La mia wishlist </span>
        <span className="text-primary text-sm">({myWishlistCount} giochi)</span>
      </Link>
    </div>
  );
}

export default Page;
