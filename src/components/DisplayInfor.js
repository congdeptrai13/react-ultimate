import React from "react";
class DisplayInfor extends React.Component {
  render() {
    //destructuring array/object
    const { listUsers } = this.props; //object
    //const listUsers = this.props.listUsers;
    //props => viết tắt properties
    return (
      <div>
        {listUsers.map((user) => {
          console.log(user)
          return (
            <div key={user.id}>
              <div>my name's {user.name}</div>
              <div>my age's {user.age}</div>
              <hr />
            </div>
          )
        })}

      </div>
    )
  }
}
export default DisplayInfor;