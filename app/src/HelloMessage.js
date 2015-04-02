import React from 'react';
module.exports = class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}