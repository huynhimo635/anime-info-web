// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.myanimelist.net"],
  },
  async rewrites() {
    return [
      {
        source: "/:id",
        destination: "https://themes.moe/api/themes*",
      },
    ];
  },
};
