const withSourceMaps = require('@zeit/next-source-maps')();
const { execSync } = require("child_process");
// const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = withSourceMaps({
  env: {
    // dsn: "https://5bf9bb226d0c40a180d9b06e052853d1@o1134611.ingest.sentry.io/4505393783046144", //beetlejuice
    dsn: "https://53784e39f1534af0931289d31364516f@o954820.ingest.sentry.io/4505308123365376",
    release: execSync('git rev-parse HEAD').toString()
  },
  webpack(config, options) {
    // https://github.com/getsentry/sentry-javascript/issues/2378
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    // SentryCliPlugin - Use only when running the production app. This will keep generating and uploading source maps
    // on every render if used in dev.

    // config.plugins.push(
    //   new SentryCliPlugin({
    //     include: '.next',
    //     ignore: ['node_modules'],
    //     urlPrefix: '~/_next',
    //     release: execSync('git rev-parse HEAD').toString()
    //   })
    // )
    return config
  }
});