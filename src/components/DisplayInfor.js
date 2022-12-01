import React, { useState } from "react";
import "./DisplayInfor.scss";
//stateless vs stateful
// class DisplayInfor extends React.Component {
//   render() {
//     console.log("call me render")
//     //destructuring array/object
//     const { listUsers } = this.props; //object
//     //const listUsers = this.props.listUsers;
//     //props => viết tắt properties
//     //template + logic js
//     return (

//       < div className="display-infor-container" >
//         {
//           true &&
//           <>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>my name's {user.name}</div>
//                   <div>my age's {user.age}</div>
//                   <div>
//                     <button onClick={() => { this.props.handleDeleteUser(user.id) }}>Delete</button>
//                   </div>
//                   <hr />
//                 </div>

//               )
//             })}

//           </>
//         }
//       </div >

//     )
//   }
// }


const DisplayInfor = (props) => {
  const { listUsers } = props; //object
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  //destructuring assignment
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  }
  return (
    < div className="display-infor-container" >
      <div>
        <span onClick={() => {
          handleShowHideListUser()
        }}>{isShowHideListUser ? "hide list user" : "show list user"}</span>
      </div>
      console.log(listUsers)
      {
        isShowHideListUser &&
        <>
          {listUsers.map((user, index) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>my name's {user.name}</div>
                <div>my age's {user.age}</div>
                <div>
                  <button onClick={() => { props.handleDeleteUser(user.id) }}>Delete</button>
                </div>
                <hr />
              </div>
            )
          })}

        </>
      }
    </div >
  )
}
export default DisplayInfor;