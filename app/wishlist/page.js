import WishListWrapper from "@/app/_components/WishListWrapper";
import {
  getMyWishlist,
  getUserPlatformsComplete,
} from "@/app/_lib/data-service";
import { wishlistByPlatforms } from "@/app/_lib/utils";

export const metadata = {
  title: "Wishlist",
};

async function Page() {
  const myWishlist = await getMyWishlist();
  const myWishlistByPlatforms = wishlistByPlatforms(myWishlist);
  const platforms = await getUserPlatformsComplete();

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
