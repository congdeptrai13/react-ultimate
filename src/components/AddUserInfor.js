import React from "react";
class AddUserInfor extends React.Component {
  state = {
    name: "",
    address: "",
    age: ""
  };
  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  handleOnChangeAge = (event) => {
    //bad code
    //this.state.age = event.target.value
    this.setState({
      age: event.target.value
    })
  }
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor((Math.random() * 100) + 1) + "-random",
      name: this.state.name,
      age: this.state.age
    });
  }
  render() {
    return (
      <div>
        my name is {this.state.name} and i {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your name:</label>
          <input value={this.state.name} type="text" onChange={(event) => {
            this.handleOnChangeInput(event)
          }} />
          <label>Your name:</label>
          <input value={this.state.age} type="text" onChange={(event) => {
            this.handleOnChangeAge(event)
          }} />
          <button>Submit</button>
        </form>
      </div>
    );
  }

}
export default AddUserInfor;