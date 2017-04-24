const path = require('path');

module.exports = {
  entry: ["./src/app.ts"],	
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
    resolve: {
      extensions: ['.ts', '.js','.tsx']
    },
  module: {
    loaders: [
      {
        test: /.scss$/,
        loaders: ["style", "css", "sass"],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
}