const path = require('path');

const config = {
  entry: path.join(__dirname, '/src/index.js'),
   output: {
    path:  path.join(__dirname,'public'),
    filename: 'bundle.js'
  },
  
  module: {
    rules: [
    { test: /\.js$/,
      exclude: /(node_modules|bower_components)/, 
      loader: ['babel-loader'] 
    }
    ]
  }
};



module.exports = config;