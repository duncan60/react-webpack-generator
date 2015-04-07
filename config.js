var webpack           = require('webpack'),
	path              = require('path'),
	ReloadPlugin      = require('webpack-reload-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
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
		path     : process.env.NODE_ENV === 'production' ? './dist' : './app',
		filename : 'js/[name].js'
	},
	plugins: [
		new ReloadPlugin('localhost'),
		new ExtractTextPlugin('assets/styles/[name].css'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'app/index.html'
		}),
		new webpack.ProvidePlugin({
			$                : 'jquery',
			jQuery           : 'jquery',
			'windows.jQuery' : 'jquery'
		})
	],
	module: {
		noParse: [],
		loaders: [
			{ test : /\.(js|jsx)$/, loader: 'babel!jshint', include: path.join(__dirname, 'app/src/')},
			{ test : /\.(woff|ttf|svg|eot)$/, loader: 'url-loader' },
			{ test : /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{ test : /\.scss$/, loader: 'style!css!compass?outputStyle=expanded&'}
		]
	},
	jshint: {
		camelcase  : true,
		emitErrors : false,
		failOnHint : false
	}
};

config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('bootstrap', bower_dir + '/bootstrap/dist/js/bootstrap.min.js');

config.addVendor('bootstrap.css', bower_dir + '/bootstrap/dist/css/bootstrap.min.css');
module.exports = config;

