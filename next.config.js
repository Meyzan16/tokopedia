/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
    },
    webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig
