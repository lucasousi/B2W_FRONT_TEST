const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const {
  override,
  addPostcssPlugins,
  addWebpackAlias,
} = require('customize-cra');

const nxPathAlias = {
  ['@src']: path.resolve(__dirname, './src'),
  ['@styles']: path.resolve(__dirname, './src/styles'),
};

/* Webpack config override to allow tailwind and nx work weel */

module.exports = {
  webpack: (config) => {
    // Override config of webpack CRA
    const overrideConfig = override(
      addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]),
      addWebpackAlias(nxPathAlias)
    )(config);

    // Remove guard against importing modules outside of `src`.
    // Needed for workspace projects.
    overrideConfig.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => !(plugin instanceof ModuleScopePlugin)
    );

    // Add support for importing workspace projects.
    overrideConfig.resolve.plugins.push(
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        mainFields: ['module', 'main'],
      })
    );

    // Replace include option for babel loader with exclude
    // so babel will handle workspace projects as well.
    overrideConfig.module.rules.forEach((r) => {
      if (r.oneOf) {
        const babelLoader = r.oneOf.find(
          (rr) => rr.loader.indexOf('babel-loader') !== -1
        );
        babelLoader.exclude = /node_modules/;
        delete babelLoader.include;
      }
    });

    return overrideConfig;
  },

  paths: (paths) => {
    // Rewrite dist folder to where Nx expects it to be.
    paths.appBuild = path.resolve(__dirname, '../../dist/apps/aquamons-store');
    return paths;
  },

  jest: (config) => {
    config.resolver = '@nrwl/jest/plugins/resolver';
    return config;
  },
};
