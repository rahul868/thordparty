/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  cssModules: {
    enable: false,
    config: {
      generateScopedName: '[local]',
    },
  },
};
 
module.exports = nextConfig;