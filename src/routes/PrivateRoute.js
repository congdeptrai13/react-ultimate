import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  // console.log("check isAuthenticated", isAuthenticated)
  console.log(props)
  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate> //redirect
  }

  return (
    <>
      {props.children}
    </>
  )
}
export default PrivateRoute;