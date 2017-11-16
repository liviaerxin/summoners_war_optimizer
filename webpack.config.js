const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  	entry: './src/index.js',
  	devtool: 'inline-source-map',
  	devServer: {
    	contentBase: './dist'
	},
	plugins: [
	  	//new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
	    	template: 'index.html'
	  	}),
      new CopyWebpackPlugin([
        { from: 'static' }
      ])
	],
  	output: {
    	filename: 'bundle.js',
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: '/'
  	}
};