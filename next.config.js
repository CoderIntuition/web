const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: "empty", net: "empty", module: "empty" };
    }

    return config;
  },

  async redirects() {
    return [
      {
        source: "/settings",
        destination: "/settings/general",
        permanent: true,
      },
    ];
  },
});
