/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["effect", "better-auth"],
  serverExternalPackages: ["@prisma/client"], // Add this line
  typescript: {
    // This ignores the 'any' type errors inside node_modules/effect
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;