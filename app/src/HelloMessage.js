import React from 'react';
module.exports = class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {msg: 'learning use Webpack and reactJs '};
  }
  render() {
    return (
    	<div>
    		<h1>Hello {this.props.name}</h1>
    		<p>{this.state.msg}</p>
    	</div>);
  }
}