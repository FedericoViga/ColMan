import { auth } from "./app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/:path?", "/games/:path*", "/platforms/:path*"],
};
