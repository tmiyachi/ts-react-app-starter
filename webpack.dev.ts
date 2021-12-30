import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import commonConfig from './webpack.common';

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    open: true,
    // historyApiFallback: true,
    // static: [
    //   {
    //     directory: path.resolve(__dirname, 'src/static/'),
    //   },
    // ],
    // proxy: [
    //   {
    //   context: [],
    //   target: "",
    //   }
    // ],
  },
};

const config: Configuration = merge(commonConfig, devConfig);

export default config;
