import React, { Component } from "react";
import { connect } from "react-redux";
// import firebase from "../../../config/firebase/index";
import "./register.scss";
import Button from "../../../components/atoms/Button";
import { registerUserApi } from "../../../config/redux/action";
// import "./register.scss";
class Register extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChangeText = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleRegisterSubmit = (e) => {
    const { email, password } = this.state;
    console.log("data before send", email, password);
    this.props.registerAPI({ email, password });
    this.setState({ email: "", password: "" });
  };
  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="title">Register Page</p>
          <input className="input" type="text" name="" placeholder="Email" id="email" onChange={this.handleChangeText} value={this.state.email} />
          <input className="input" type="password" name="" placeholder="Password" id="password" onChange={this.handleChangeText} value={this.state.password} />
          <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
        </div>
        {/* <button>Go to Login</button>
        <button>Go to Dahsboard</button> */}
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserApi(data)),
});
export default connect(reduxState, reduxDispatch)(Register);
