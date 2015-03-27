/*
*require css
*/
require('bootstrap.css');
require('../assets/styles/style');
require("!css!compass!../assets/styles/styleA.scss");

var React = require('react');
var AppComponent = require('./AppComponent');

React.render(<AppComponent/>, document.getElementById('app'));
