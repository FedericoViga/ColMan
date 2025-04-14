import Link from "next/link";
import { auth } from "../_lib/auth";

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
          <div className="text-primary flex items-center gap-2">
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="h-7 rounded-full"
              referrerPolicy="no-referrer"
            />
            <span>{session?.user?.name.split(" ")[0]}</span>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
