import { auth } from "@/app/_lib/auth";
import WishListWrapper from "@/app/_components/WishListWrapper";
import { getAllPlatforms, getMyWishlist } from "@/app/_lib/data-service";
import { wishlistByPlatforms } from "@/app/_lib/utils";

export const metadata = {
  title: "Wishlist",
};

async function Page() {
  const session = await auth();
  const email = session?.user?.email;

  const myWishlist = await getMyWishlist(email);
  const myWishlistByPlatforms = wishlistByPlatforms(myWishlist);
  const platforms = await getAllPlatforms();

  return (
    <div className="container">
      <WishListWrapper
        wishlistByPlatforms={myWishlistByPlatforms}
        platforms={platforms}
      />
    </div>
  );
}

export default Page;
