import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { BannerPlugin, Configuration } from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import commonConfig from './webpack.common';

const BANNER = `
/*! FOLLOWING LIBRARIES ARE USED.
 * - core-js (https://github.com/zloirock/core-js/blob/master/LICENSE)
 *   The MIT License (MIT)
 *   Copyright (c) 2014-2021 Denis Pushkarev
 *
 * - React (https://github.com/facebook/react/blob/main/LICENSE)
 *  The MIT License (MIT)
 *  Copyright (c) Facebook, Inc. and its affiliates.
 */`;

const prodConfig: Configuration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              // cssのコメントはLICENSE含めて除去（BANNERに記載する）
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        extractComments: /^\**! FOLLOWING LIBRARIES ARE USED/i, // BANNERに記載したLICENSEを抽出して別ファイルで配置する
      }),
    ],
  },
  plugins: [
    new BannerPlugin({
      banner: BANNER,
      raw: true,
    }),
  ],
};

const config: Configuration = merge(commonConfig, prodConfig);

export default config;
