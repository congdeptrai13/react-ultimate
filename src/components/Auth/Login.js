import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner2 } from "react-icons/im";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("invalid email");
      return;
    }
    if (!password) {
      toast.error("invalid password");
      return;
    }
    setIsLoading(true);
    //submit apis
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(doLogin(data))
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");

    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  }
  const handleBack = () => {
    navigate("/");
  }
  return (
    <div className="login-container">
      <div className="header">
        <span> Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">
        CONGDEPTRAI
      </div>
      <div className="welcome col-4 mx-auto">
        Hello, who’s this?

      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            password={password}
            onChange={(event) => setPassword(event.target.value)}
          />

        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading === true ? <ImSpinner2 className="loader-icon" /> : ""}
            <span> Login to CONGDEPTRAI</span>
          </button>
        </div>
        <div className="back text-center" >
          <span onClick={() => handleBack()}>	&#60;&#60; go to HomePage</span>
        </div>
      </div>

    </div>
  )
}
export default Login