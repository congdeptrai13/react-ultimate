import React from "react";
class DisplayInfor extends React.Component {
  render() {
    //destructuring array/object
    const { age, name } = this.props; //object
    //props => viết tắt properties
    return (
      <div>
        <div>
          my name is {this.props.name}
        </div>
        <div> my age's {this.props.age}</div>

      </div>
    )
  }
}
export default DisplayInfor;