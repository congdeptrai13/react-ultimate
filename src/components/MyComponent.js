// class component 
//function component

import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "cong",
    address: "congdeptrai",
    age: 20
  };
  //JSX 
  render() {
    return (
      <div>
        my name is {this.state.name} and i from {this.state.address}
      </div>
    );
  }
}
export default MyComponent;