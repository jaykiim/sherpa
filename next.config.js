/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
