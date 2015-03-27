var webpack           = require("webpack"),
	path              = require('path');
	ReloadPlugin      = require('webpack-reload-plugin'),//reload auto
	ExtractTextPlugin = require('extract-text-webpack-plugin'),//css 獨立檔案
	bower_dir         = __dirname + '/app/bower_components';
var config = {
	addVendor: function (name, path) {
	    this.resolve.alias[name] = path;
	    this.module.noParse.push(new RegExp('^' + name + '$'));
	},
	entry: {
		bundle  : './app/src/main.js',
		vendors : ['jquery','bootstrap']
    },
	resolve: {
		alias      : {},
		extensions : ['', '.css', '.scss', '.js']
	},
	output: {
		path     : './app',
		filename : 'js/[name].js'
	},
	plugins: [
        new ReloadPlugin('localhost'),
        new ExtractTextPlugin('assets/styles/[name].css'),
        new webpack.ProvidePlugin({
			$                : "jquery",
			jQuery           : "jquery",
			"windows.jQuery" : "jquery"
		})
    ],
	module: {
		noParse: [],
		loaders: [
			{ test : /\.js$/, loader: 'jsx-loader' },
			{ test : /\.(woff|ttf|svg|eot)$/, loader: 'url-loader' },
			{ test : /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{ test: /\.scss$/,
				loader: "style!css!compass?outputStyle=expanded&" +
		        "includePaths[]=" + (path.resolve(__dirname, "./bower_components")) + "&" +
		        "includePaths[]=" + (path.resolve(__dirname, "./node_modules"))
			}
		]
	}
};

config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('bootstrap', bower_dir + '/bootstrap/dist/js/bootstrap.min.js');

config.addVendor('bootstrap.css', bower_dir + '/bootstrap/dist/css/bootstrap.min.css');
module.exports = config;