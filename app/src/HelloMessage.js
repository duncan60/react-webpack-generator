import React from 'react';
module.exports = class HelloMessage extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
					msg  : 'learning use Webpack and reactJs 0.13.1',
					tick : 0
				};
	}
  	onClickHandeler() {
		this.setState({tick : this.state.tick + 1});
  	}
  	/* jshint ignore:start */
  	render() {
		return (
			<div>
				<h1>Hello {this.props.name}</h1>
				<p>{this.state.msg}</p>
				<p onClick={this.onClickHandeler.bind(this)}>{this.state.tick}</p>
			</div>);
  	}
  	/* jshint ignore:end */
}