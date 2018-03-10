module.exports = {
  entry: {
    main: './src/main.js',
    timeline: './src/timeline.js',
    options: './src/options.js'
  },

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
};
