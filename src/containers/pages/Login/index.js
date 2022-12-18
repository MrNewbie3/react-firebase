import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/atoms/Button";
import { loginUserApi } from "../../../config/redux/action";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleChangeText = (e) => {
    if (e.target.id === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  };

  const handleRegisterSubmit = async (e) => {
    console.log("data before send", email, password);
    const res = await props.loginApi({ email, password }).catch((err) => err);
    console.log(res);
    if (res) {
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      setEmail("");
      setPassword("");
      console.error("Login fail");
    }
  };
  return (
    <div className="">
      <div className="auth-container">
        <div className="auth-card">
          <p className="title">Login Page</p>
          <input className="input" type="text" name="" placeholder="Email" id="email" onChange={handleChangeText} value={email} />
          <input className="input" type="text" name="" placeholder="Password" id="password" onChange={handleChangeText} value={password} />
          <Button onClick={handleRegisterSubmit} title="Login" loading={props.isLoading} />
        </div>
        {/* <button>Go to Login</button>
        <button>Go to Dahsboard</button> */}
      </div>
    </div>
  );
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginApi: (data) => dispatch(loginUserApi(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
