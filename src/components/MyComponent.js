// class component 
//function component

import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "cong",
    address: "congdeptrai",
    age: 20
  };
  handleClick(event) {
    // console.log(">> click me my button");
    
  }
  handleOnMouseOver(event) {
    console.log(event.pageX)
  }
  //JSX 
  render() {
    return (
      <div>
        my name is {this.state.name} and i from {this.state.address}
        <button onMouseOver={this.handleOnMouseOver}>hover me</button>
      </div >
    );
  }
}
export default MyComponent;