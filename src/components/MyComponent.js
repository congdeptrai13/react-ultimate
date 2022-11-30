// class component 
//function component

import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Hoi Dan IT", age: "16" },
      { id: 2, name: "cong", age: "26" },
      { id: 3, name: "congdeptrai", age: "69" },
    ]
  }
  handleAddNewUser = (userObj) => {
    let listUserClone = [...this.state.listUsers];
    listUserClone.unshift(userObj);
    // this.setState({
    //   listUsers: [userObj, ...this.state.listUsers]
    // })
    this.setState({
      listUsers: [...this.state.listUsers, userObj],
    })
  }
  //JSX 
  render() {
    //dry  : don't repeat yourself
    return (
      <div>
        <AddUserInfor
          handleAddNewUser={this.handleAddNewUser}
        />
        <br /><br />

        <DisplayInfor
          listUsers={this.state.listUsers}
        />
      </div >
    );
  }
}
export default MyComponent;