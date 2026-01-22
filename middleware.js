// middleware.js
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "./app/_lib/supabaseServer";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();

  // se sei su /login e sei loggato, vai a "/"
  if (url.pathname === "/login" && session) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // se non loggato e non sei su login vai a "/login"
  if (url.pathname !== "/login" && !session) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
