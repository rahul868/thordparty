/**
 * @type {import('next').NextConfig}
 */
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();
const nextConfig = {
  output: "export",
  cssModules: {
    enable: false,
    config: {
      generateScopedName: "[local]",
    },
  },
};

module.exports = nextConfig;
