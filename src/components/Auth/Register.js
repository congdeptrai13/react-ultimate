import { useState } from "react";
import "./Register.scss"
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("invalid email");
      return;
    }
    if (!password) {
      toast.error("invalid password");
      return;
    }
    let data = await postRegister(email, username, password);
    console.log(data)
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }
  return (
    <>
      <div className="register-container">
        <div className="title col-6 mx-auto">
          Đăng Kí
        </div>
        <div className="form-group col-6 mx-auto pass-group">
          <label>
            Email (*)
          </label>
          <input
            className="form-control"
            type={"Email"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>
            Password (*)
          </label>
          <input type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? <span className="icons-eye" onClick={() => setIsShowPassword(false)}><VscEye /></span>
            :
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}><VscEyeClosed /></span>}
          <label>
            name
          </label>
          <input type={"name"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-success m-2" onClick={() => handleSubmit()}>Create my free account</button>
        </div>

        <div className="back text-center" >
          <span onClick={() => navigate("/")}>	&#60;&#60; go to HomePage</span>
        </div>
      </div>
    </>
  )
}
export default Register;