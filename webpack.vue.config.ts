import path from 'path'
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import nodeExternals from 'webpack-node-externals'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config = (env: NodeJS.ProcessEnv = {}): Configuration => {
  const isProd = (env.mode === 'production');
  const isSSR = (env.rendering === 'ssr');
  const noMinimize = (env.minimize === 'false');
  const noBabel = (env.babel === 'false');
  const isServer = (env.target === 'server');

  const environment = isProd ? 'production' : 'development';
  
  const genConfig = (isServerBuild: boolean = false): Configuration => {
    const minimize = isProd && !noMinimize
    const useBabel = isProd && !isServerBuild && !noBabel
    process.env.NODE_ENV = environment;
    let config: Configuration = {
      mode: environment,
      entry: isServerBuild
        ? path.resolve(__dirname, 'src', 'server', 'ssr.ts')
        : [path.resolve(__dirname, 'src', 'main.ts')].concat((!isProd) ? ['webpack-hot-middleware/client?reload=true?overlay=true'] : []),
      target: isServerBuild ? 'node' : 'web',
      devtool: 'source-map',
      output: {
        path: path.resolve(
          __dirname,
          isSSR ? (isServerBuild ? 'dist-ssr/server' : 'dist-ssr/dist') : 'dist'
        ),
        filename: (isProd && !isServerBuild) ? '[name].[contenthash].js' : '[name].js',
        publicPath: '/dist/',
        libraryTarget: isServerBuild ? 'commonjs' : undefined,
        assetModuleFilename: (isProd) ? '[name].[contenthash][ext]' : '[name][ext]',
        chunkFilename: '[name].[chunkhash].js'
      },
      externals: [
        isServerBuild ? nodeExternals({ allowlist: /\.(css|vue)$/ }) : {}
      ],
      module: {
        rules: [
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader',
                options: {
                  isServerBuild: isServerBuild
                }
              }
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  emit: !isServer
                }
              },
              'css-loader',
              'postcss-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  emit: !isServer
                }
              },
              "css-loader",
              'postcss-loader',
              'less-loader',
            ],
          },
          {
            test: /\.tsx?$/,
            use: [
              ...(useBabel ? [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },] : []),
              {
                loader: 'ts-loader',
                options:
                {
                  appendTsSuffixTo: [/\.vue$/],
                  transpileOnly: true,
                  configFile: require.resolve('./tsconfig.webpack.json')
                }
              },
            ],
          },
          {
            test: /\.m?jsx?$/,
            use: (useBabel) ? [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              }
            ] : [],
            exclude: /node_modules/,
          },
        ],
      },
      cache: (!isProd) ?
        {
          type: 'filesystem',
          name: isServer ? "server" : "client",
          buildDependencies: {
            config: [__filename]
          }
        } : false
      ,
      plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: (isProd) ? '[name].[contenthash].css' : '[name].css'
        }),
        new DefinePlugin({
          __IS_SSR__: isSSR,
          __IS_DEV__: !isProd,
          __IS_SERVER__: isServerBuild,
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
        }),
        new HtmlWebpackPlugin({
          filename: 'test.html',
          template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new CleanWebpackPlugin()
      ],
      optimization: {
        splitChunks: (isServer) ?
          {
            cacheGroups: {
              main: {
                name: 'main',
                chunks: 'all',
                enforce: true
              }
            }
          }
          : (isProd) ?
            {
              chunks: 'all'
            } : false
        ,
        minimize: minimize
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', ".mjs", 'jsx', ".vue", ".json", ".wasm"],
      },
    }
    if (!isServerBuild && !isProd)
        config.plugins!.push(new HotModuleReplacementPlugin());
    
    return config;
  }
  return genConfig(isServer)
}

export default config;