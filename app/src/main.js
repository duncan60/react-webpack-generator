/*
*require css
*/
require('bootstrap.css');
require('../assets/styles/style');
require('../assets/styles/styleA');

var React = require('react');
var AppComponent = require('./AppComponent');

React.render(<AppComponent/>, document.getElementById('app'));
