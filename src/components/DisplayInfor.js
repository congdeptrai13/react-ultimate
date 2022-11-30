import React from "react";
class DisplayInfor extends React.Component {

  state = {
    isShowListUser: true,
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
    return (
      <div>
        <div>
          <span onClick={() => { this.handleShowHide() }}>{this.state.isShowListUser ? "hide" : "show"} list users:</span>
        </div>
        {this.state.isShowListUser &&
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                  <div>my name's {user.name}</div>
                  <div>my age's {user.age}</div>
                  <hr />
                </div>
              )
            })}

          </div>
        }
      </div>

    )
  }
}
export default DisplayInfor;