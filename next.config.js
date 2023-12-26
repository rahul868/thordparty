/**
 * @type {import('next').NextConfig}
 */
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();

const documentia_env = process.env.DOCUMENTIA_ENV;
if (documentia_env == "DEV") {
  // Prod
  nextConfig = {
    basePath: "/home",
  };
} else {
  nextConfig = {
    assetPrefix: "/home",
  };
}

module.exports = nextConfig;
