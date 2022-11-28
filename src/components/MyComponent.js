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
  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
  }
  //JSX 
  render() {
    return (
      <div>
        my name is {this.state.name} and i {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input type="text" onChange={(event) => {
            this.handleOnChangeInput(event)

          }} />
          <button>Submit</button>
        </form>
      </div >
    );
  }
}
export default MyComponent;