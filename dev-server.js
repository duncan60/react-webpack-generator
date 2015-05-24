var webpack = require('webpack');
    WebpackDevServer = require('webpack-dev-server'),
    util = require('util'),
    opn = require('opn'),
    port = 8080,
    host = 'localhost',
    config = require('./webpack-dev-server.config.js');

var server = new WebpackDevServer(
    webpack(config),
    {
        contentBase: 'app',
        hot: true
    }
);

server.listen(port, host, function (err) {
    if (err) { console.log(err); }
    var url = util.format('http://%s:%d', host, port);
    opn(url);
});