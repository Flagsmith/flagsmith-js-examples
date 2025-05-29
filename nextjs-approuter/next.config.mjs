/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Bootstrap SCSS dependencies are throwing warnings in the terminal
  // due to some deprecated functions used in the codebase. Since this is
  // a demo app, and the warnings are irrelevant to the app's functionality,
  // we can suppress them by setting the `quietDeps` option to `true`.
  sassOptions: {
    quietDeps: true,
  },
}

export default nextConfig
