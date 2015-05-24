var webpack           = require('webpack'),
	path              = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	bower_dir         = __dirname + '/app/bower_components',
	autoprefixer      = require('autoprefixer-core'),
	csswring          = require('csswring');
var pkg = require('./package.json');
var util = require('util');
module.exports = function(options) {
	var outputPath = options.outputPath;
	var entry = {
			bundle  : null,
			vendors : null
		};
	var vendors = [];
	var noParse = [];
	var loaders = [{ test : /\.(woff|ttf|svg|eot|jpg|png|git)$/, loader: 'url-loader?limit=10' }];
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
		entry.bundle = ['./app/src/main'];
		entry.bundle.push(
		    util.format(
		      'webpack-dev-server/client?http://%s:%d',
		      pkg.config.devHost,
		      pkg.config.devPort
		    )
		);
		entry.bundle.push('webpack/hot/dev-server');
		loaders.push(
			{ test : /\.(js|jsx)$/, loader:'react-hot!babel', include: path.join(__dirname, 'app/src/')},
			{ test : /\.scss$/, loader:'style!css!postcss!sass?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib') },
			{ test : /\.css$/, loader:'style!css' }
		);
	}

	if (options.status === 'deploy') {
		entry.bundle = './app/src/main';
		loaders.push(
			{ test : /\.(js|jsx)$/, loader:'babel', include: path.join(__dirname, 'app/src/')},
			{ test : /\.scss$/, loader:ExtractTextPlugin.extract('style','css!postcss!sass?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')) },
			{ test : /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') }
		);
		plugins.push(
			new HtmlWebpackPlugin({
				filename : 'index.html',
				template : 'app/index.html'
			}),
			new ExtractTextPlugin('assets/styles/[name].css',{
      allChunks: true
    }),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : JSON.stringify("production")
				}
			})
		);
	}


	var addVendor = function (type, name, path) {
		resolve.alias[name] = path;
		noParse.push(new RegExp('^' + name + '$'));
		if (type === 'js'){
			vendors.push(name);
			entry.vendors = vendors;
		}
	};
	//Vendor style
	addVendor('css', 'bootstrap.css', bower_dir + '/bootstrap/dist/css/bootstrap.min.css');
	//Vendor plugin
	addVendor('js', 'jquery', bower_dir + '/jquery/dist/jquery.min.js');
	addVendor('js', 'bootstrap', bower_dir + '/bootstrap/dist/js/bootstrap.min.js');
	return{
		entry   : entry,
		output  : {
			path     :  outputPath,
			filename : 'js/[name].js',
		},
		module  : {
			noParse : noParse,
			loaders : loaders
		},
		postcss : [autoprefixer, csswring],
		resolve : resolve,
		plugins : plugins,
		devServer: {
		    contentBase: 'app',
		    hot: true
		}
	}
}

