import React from 'react';
module.exports = class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    				msg  : 'learning use Webpack and reactJs',
					tick : 0
				};
  }
  onClickHandeler() {
    this.setState({tick : this.state.tick + 1});
  }
  render() {
    return (
    	<div>
    		<h1>Hello {this.props.name}</h1>
    		<p>{this.state.msg}</p>
    		<p onClick={this.onClickHandeler.bind(this)}>{this.state.tick}</p>
    	</div>);
  }
}