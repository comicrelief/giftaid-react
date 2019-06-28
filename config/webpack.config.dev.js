'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills'),
    require.resolve('react-error-overlay'),
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@babel/runtime': path.dirname(
        require.resolve('@babel/runtime/package.json')
      ),
      'react-native': 'react-native-web',
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: [
          paths.appSrc,
          path.resolve(paths.appNodeModules, '@comicrelief/pattern-lab'),
          path.resolve(paths.appNodeModules, '@comicrelief/storybook')
        ],
      },
      {
        test: /\.scss$/,
        include: [
          paths.appSrc,
          path.resolve(paths.appNodeModules, '@comicrelief/pattern-lab'),
          path.resolve(paths.appNodeModules, '@comicrelief/storybook')
        ],
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: [
              paths.appSrc,
              path.resolve(paths.appNodeModules, '@comicrelief/pattern-lab'),
              path.resolve(paths.appNodeModules, '@comicrelief/storybook')
            ],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/,/\.sass$/,/\.scss$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      cspPlugin: { //adds CSP Meta tag plugin
        enabled: true,
        policy: {
          'default-src': "'none'",
          'frame-ancestors': "'self'",
          'manifest-src': "'self'",
          'base-uri': "'self'",
          'style-src': [
            "'self'",
            "'unsafe-inline'",
            "blob:",
            "https://fonts.googleapis.com",
            "https://*.netlify.com"
          ],
          'font-src': [
            "'self'",
            "'unsafe-inline'",
            "https://*.cloudfront.net",
            "https://fonts.gstatic.com",
            "https://*.netlify.com"
          ],
          'img-src': [
            "'self'",
            "data:",
            "https://*.googletagmanager.com",
          ],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "http://cdn.polyfill.io",
            "https://*.google.com",
            "https://*.cloudfront.net",
            "https://*.netlify.com",
            "https://www.gstatic.com",
            "https://www.google-analytics.com",
            "https://www.googletagmanager.com"
          ],
          'connect-src': [
            "'self'",
            "https://*.comicrelief.com",
            "https://sentry.io",
            "https://*.netlify.com"
          ],
          'frame-src': [
            "'self'",
            "https://*.comicrelief.com",
            "https://*.google.com",
            "https://*.netlify.com"
          ],
          'child-src': "'none'",
          'object-src': "'none'",
          'form-action': "'none'"
        },
        hashEnabled: {
          'script-src': false,
          'style-src': false
        },
        nonceEnabled: {
          'script-src': false,
          'style-src': false
        }
      },
    }),
    // Creates the CSP meta tag in index.html.
    new CspHtmlWebpackPlugin({
      'default-src': "'none'",
      'frame-ancestors': "'self'",
      'manifest-src': "'self'",
      'base-uri': "'self'",
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        "blob:",
        "https://fonts.googleapis.com",
        "https://*.netlify.com"
      ],
      'font-src': [
        "'self'",
        "'unsafe-inline'",
        "https://*.cloudfront.net",
        "https://fonts.gstatic.com",
        "https://*.netlify.com"
      ],
      'img-src': [
        "'self'",
        "data:",
        "https://*.googletagmanager.com",
      ],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "http://cdn.polyfill.io",
        "https://*.google.com",
        "https://*.cloudfront.net",
        "https://*.netlify.com",
        "https://www.gstatic.com",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com"
      ],
      'connect-src': [
        "'self'",
        "https://*.comicrelief.com",
        "https://sentry.io",
        "https://*.netlify.com"
      ],
      'frame-src': [
        "'self'",
        "https://*.comicrelief.com",
        "https://*.google.com",
        "https://*.netlify.com"
      ],
      'child-src': "'none'",
      'object-src': "'none'",
      'form-action': "'none'"
    }, {
      enabled: true,
      hashingMethod: 'sha256',
      hashEnabled: {
        'script-src': false,
        'style-src': false
      },
      nonceEnabled: {
        'script-src': false,
        'style-src': false
      }
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
