/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "igyqtugipdfweornkjrg.supabase.co",
        pathname: "/storage/v1/object/public/games-images//**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
