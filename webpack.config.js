const path = require('path');

module.exports = {
    mode: 'production',
  entry: './main.js', // путь к вашему основному файлу JavaScript
  output: {
    filename: 'bundle.js', // имя файла сборки
    path: path.resolve(__dirname, 'dist'), // путь к директории сборки
  },
  module: {
    rules: [
      {
        test: /\.js$/, // файлы с расширением .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // использование babel-loader для трансформации ES6+ кода
        },
      },
    ],
  },
};
