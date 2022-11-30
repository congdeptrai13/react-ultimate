import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
class DisplayInfor extends React.Component {
  constructor(props) {
    super(props);
    //babel compiler
    state = {
      isShowListUser: true,
    }

  }
}
handleShowHide = () => {
  this.setState({
    isShowListUser: !this.state.isShowListUser,
  })
}
render() {
  //destructuring array/object
  const { listUsers } = this.props; //object
  //const listUsers = this.props.listUsers;
  //props => viết tắt properties
  //template + logic js
  return (
    <div className="display-infor-container">
      {/* <img src={logo} /> */}
      <div>
        <span onClick={() => { this.handleShowHide() }}>{this.state.isShowListUser ? "hide" : "show"} list users:</span>
      </div>
      {this.state.isShowListUser &&
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>my name's {user.name}</div>
                <div>my age's {user.age}</div>
                <div>
                  <button onClick={() => { this.props.handleDeleteUser(user.id) }}>Delete</button>
                </div>
                <hr />
              </div>

            )
          })}

        </>
      }
    </div>

  )
}
}
export default DisplayInfor;