/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "igyqtugipdfweornkjrg.supabase.co",
        pathname: "/storage/v1/object/sign/images/users/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
