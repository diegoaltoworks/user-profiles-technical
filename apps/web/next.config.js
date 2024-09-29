const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/schema"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
