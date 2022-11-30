// class component 
//function component

import React from "react";
import DisplayInfor from "./DisplayInfor";
import UserInfor from "./UserInfor";
class MyComponent extends React.Component {

  //JSX 
  render() {
    const myAge = 50;
    const myInfor = ['ab', 'c', 'c'];
    return (
      <div>
        <UserInfor />
        <br /><br />
        <DisplayInfor name="Hoi Dan IT" age="30" />
        <hr />
        <DisplayInfor name="cong" age={myAge} myInfor={myInfor} />
      </div >
    );
  }
}
export default MyComponent;