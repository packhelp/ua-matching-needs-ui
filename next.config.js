/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pl-PL"],
    defaultLocale: "pl-PL",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tickets/add",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
