import React from "react";
import BaseForm from "./baseForms";
import Joi from "joi";
import { apiEndpoint, serverUrls, urls } from "../../configuration";
import httpService from "../httpService";
import { setJwt, setRefreshToken } from "../authService";
import { startLoading} from "../loadingAnimation";
import { Link } from "react-router-dom";

class LoginForm extends BaseForm {
  state = {
    data: {},
    errors: {}
  };
  schema = {
    username: Joi.string().required().min(3).max(32).alphanum().label("Username"),
    password: Joi.string().required().min(4).max(32)
  };

  doSubmit = async () => {
    try {
      startLoading("Checking username and password");
      const res = await httpService.post(`${apiEndpoint}${serverUrls.login}/`, {...this.state.data});
      const {access, refresh} = res.data;
      setJwt(access);
      setRefreshToken(refresh);
      this.props.history.replace("/users/profile");
    } catch (ex) {
      if (ex.response && (ex.response.status === 400 || ex.response.status === 401)) {
        const errors = {...this.state.errors, username: "No active account found with the given credentials"};
        this.setState({ errors });
      }
    }
  };

  // requestGoogleLogin = () => {
  //
  // }

  render() {
    return (
      <div className="container">
        <form className={"one-form"} onSubmit={this.handleSubmit} method="post">
          {/*{this.renderButton("Login With Google", "btn btn-info form-btn", {*/}
          {/*  onClick: this.requestGoogleLogin*/}
          {/*})}*/}
          {/*{this.renderButton("Login With Facebook", "btn btn-primary form-btn")}*/}
          <div className={"blank20"} />
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderSubmitButton("Login", "btn btn-success form-btn")}
          <p>New user <Link to={urls.register} className="text-success">register</Link></p>
          <Link to={urls.resetPassword} className="text-danger">Forgot password?</Link>
        </form>
      </div>
    );
  }
}

export default LoginForm;