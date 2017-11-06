const path = require('path');           // インポートはCommonJS形式
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',             // バンドル対象ソースのエントリポイント
                                        // (バンドル出力ファイルが複数の場合は複数指定)
  devtool: 'inline-source-map',         // エラー時にバンドル前のソースの位置を表示
  devServer: {
    contentBase: './dist'               // webpack-dev-serverのコンテンツディレクトリ
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),   // 出力ディレクトリをきれいにする
    new HtmlWebpackPlugin({             // index.htmlを配置
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  output: {
    filename: 'bundle.js',                 // バンドル出力ファイル
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,   // ローダーを適用するファイルを正規表現で指定
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};

