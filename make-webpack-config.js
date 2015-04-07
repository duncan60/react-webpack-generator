var webpack           = require('webpack'),
	path              = require('path'),
	ReloadPlugin      = require('webpack-reload-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	bower_dir         = __dirname + '/app/bower_components';

module.exports = function(options) {
	var outputPath = options.outputPath,
		noParse    = [],
		resolve    = {
			alias      : {},
			extensions : ['', '.css', '.scss', '.js']
		},
		jshint     = {
			camelcase  : true,
			emitErrors : false,
			failOnHint : false
		};
	var addVendor = function (name, path) {
		resolve.alias[name] = path;
		noParse.push(new RegExp('^' + name + '$'));
	}
	//Vendor style
	addVendor('bootstrap.css', bower_dir + '/bootstrap/dist/css/bootstrap.min.css');
	//Vendor plugin
	addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
	addVendor('bootstrap', bower_dir + '/bootstrap/dist/js/bootstrap.min.js');

	return{
		entry: {
			bundle  : './app/src/main.js',
			vendors : ['jquery','bootstrap']
		},
		resolve: resolve,
		output: {
			path              :  outputPath,
			filename          : 'js/[name].js'
		},
		plugins: [
			new ReloadPlugin('localhost'),
			new ExtractTextPlugin('assets/styles/[name].css'),
			new HtmlWebpackPlugin({
				filename : 'index.html',
				template : 'app/index.html'
			}),
			new webpack.ProvidePlugin({
				$                : 'jquery',
				jQuery           : 'jquery',
				'windows.jQuery' : 'jquery'
			})
		],
		module: {
			noParse: noParse,
			loaders: [
				{ test : /\.(js|jsx)$/, loader: 'babel!jshint', include: path.join(__dirname, 'app/src/')},
				{ test : /\.(woff|ttf|svg|eot)$/, loader: 'url-loader' },
				{ test : /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
				{ test : /\.scss$/, loader: 'style!css!compass?outputStyle=expanded&'}
			]
		},
		jshint: jshint
	}
}

