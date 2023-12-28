const dotenv = require("dotenv");
dotenv.config();

const documentia_env = process.env.DOCUMENTIA_ENV;
console.log("sksks", documentia_env);
let nextConfig = {};

if (documentia_env === "DEV") {
  // Development
  nextConfig = {
    basePath: "/home",
  };
} else {
  // Production
  nextConfig = {
    assetPrefix: "/home",
  };
}

module.exports = nextConfig;
