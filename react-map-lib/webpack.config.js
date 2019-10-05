const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: "source-map",
    externals: [
      {
        leaflet: {
          amd: 'leaflet',
          commonjs: 'leaflet',
          commonjs2: 'leaflet',
          root: 'L'
        }
      },
      {
        'react-leaflet': {
          amd: 'react-leaflet',
          commonjs: 'react-leaflet',
          commonjs2: 'react-leaflet'
        }
      },
      {
        react: {
          amd: 'react',
          commonjs: 'react',
          commonjs2: 'react',
          root: 'React'
        }
      }
    ],
    module: {
      rules: [
        { test: /\.ts(x?)$/, exclude: /node_modules/, use: [ {loader: "ts-loader"}] },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    }
  };