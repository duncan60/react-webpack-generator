var webpack           = require('webpack'),
	path              = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	bower_dir         = __dirname + '/app/bower_components';

module.exports = function(options) {
	var outputPath = options.outputPath;
	var entry;
	var noParse = [];
	var loaders = [{ test : /\.(woff|ttf|svg|eot|jpg|png|git)$/, loader: 'url-loader' }];
	var resolve = {
		alias      : {},
		extensions : ['', '.css', '.scss', '.js']
	};
	var plugins = [
		new webpack.ProvidePlugin({
			$                : 'jquery',
			jQuery           : 'jquery',
			'windows.jQuery' : 'jquery'
		}),
		new webpack.NoErrorsPlugin()
	];

	if (options.status === 'dev') {
		entry = {
			bundle  : ['webpack-dev-server/client?http://localhost:8080','webpack/hot/only-dev-server','./app/src/main'],
			vendors : ['jquery','bootstrap']
		};
		loaders.push(
			{ test : /\.(js|jsx)$/, loader:'react-hot!babel!jshint', include: path.join(__dirname, 'app/src/')},
			{ test : /\.css$/, loader:'style-loader!css-loader' },
			{
				test   : /\.scss$/,
				loader : 'style-loader!css-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
	        }
		);
	}

	if (options.status === 'deploy') {
		entry = {
			bundle  : './app/src/main',
			vendors : ['jquery','bootstrap']
		};
		loaders.push(
			{ test : /\.(js|jsx)$/, loader:'babel', include: path.join(__dirname, 'app/src/')},
			{ test : /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{
				test   : /\.scss$/,
				loader : ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib'))
	        }
		);
		plugins.push(
			new HtmlWebpackPlugin({
				filename : 'index.html',
				template : 'app/index.html'
			}),
			new ExtractTextPlugin('assets/styles/[name].css'),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : JSON.stringify("production")
				}
			})
		);
	}

	var jshint = {
			esnext    : true,
			bitwise   : true,
			camelcase : false,
			curly     : true,
			eqeqeq    : true,
			immed     : true,
			indent    : 4,
			latedef   : true,
			newcap    : true,
			noarg     : true,
			quotmark  : 'single',
			undef     : true,
			strict    : true
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
		entry   : entry,
		output  : {
			path     :  outputPath,
			filename : 'js/[name].js'
		},
		module  : {
			noParse : noParse,
			loaders : loaders
		},
		resolve : resolve,
		plugins : plugins,
		jshint  : jshint
	}
}

