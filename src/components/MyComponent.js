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
    this.setState({
      name: "eric",
      age: Math.floor((Math.random() * 100) + 1),
    })
  }
  handleOnMouseOver(event) {
    // console.log(event.pageX)
  }
  //JSX 
  render() {
    return (
      <div>
        my name is {this.state.name} and i {this.state.age}
        <button onMouseOver={this.handleOnMouseOver}>hover me</button>
        <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
      </div >
    );
  }
}
export default MyComponent;