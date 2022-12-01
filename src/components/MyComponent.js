// class component 
//function component

import React, { Fragment, useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";
const MyComponent = (props) => {
  // state = {
  //   listUsers: [
  //     { id: 1, name: "Hoi Dan IT", age: "16" },
  //     { id: 2, name: "cong", age: "26" },
  //     { id: 3, name: "congdeptrai", age: "69" },
  //   ]

  const [listUsers, setListUsers] = useState(
    [
      { id: 1, name: "Hoi Dan IT", age: "16" },
      { id: 2, name: "cong", age: "26" },
      { id: 3, name: "congdeptrai", age: "69" },
    ]
  )
  const handleAddNewUser = (userObj) => {
    // this.setState({
    //   listUsers: [userObj, ...this.state.listUsers]
    // })
    setListUsers(userObj, ...listUsers)
  }
  const handleDeleteUser = (userId) => {
    let listUsersClone = [...listUsers];
    listUsersClone = listUsersClone.filter(item => item.id !== userId);
    setListUsers(listUsersClone)
    // this.setState({
    //   listUsers: listUsersClone
    // })
  }
  //JSX 
  //dry  : don't repeat yourself
  //convert object to string = JSON.stringify()
  return (
    <>
      <div className="a">
        <AddUserInfor
          handleAddNewUser={handleAddNewUser}
        />
        <br /><br />

        <DisplayInfor
          listUsers={listUsers}
          handleDeleteUser={handleDeleteUser}
        />
      </div>
      <div className="b">

      </div>
    </>
  );
}
export default MyComponent;