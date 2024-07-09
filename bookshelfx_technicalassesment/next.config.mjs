/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['m.media-amazon.com', 'raw.githubusercontent.com', 'books.google.com'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
  
  export default nextConfig;
