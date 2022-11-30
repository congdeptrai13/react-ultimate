// class component 
//function component

import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfor";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Hoi Dan IT", age: "16" },
      { id: 2, name: "cong", age: "26" },
      { id: 3, name: "congdeptrai", age: "69" },
    ]
  }
  //JSX 
  render() {
    //dry  : don't repeat yourself
    return (
      <div>
        <UserInfor />
        <br /><br />

        <DisplayInfor listUsers={this.state.listUsers} />
      </div >
    );
  }
}
export default MyComponent;