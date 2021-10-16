import React from "react";
import BaseForm from "./baseForms";
import Joi from "joi";
import { apiEndpoint, serverUrls, urls } from "../../configuration";
import { Link } from "react-router-dom";
import { startLoading} from "../loadingAnimation";
import httpService from "../httpService";

class RegisterForm extends BaseForm {
  state = {
    data: {},
    errors: {}
  };
  schema = {
    username: Joi.string().required().min(3).max(32).alphanum().label("Username"),
    email: Joi.string().email({ tlds: { allow: ["com", "edu"] } }),
    first_name: Joi.string().alphanum().required().min(2).max(15),
    last_name: Joi.string().alphanum().required().min(2).max(15),
    password: Joi.string().required().min(4).max(32),
    re_password: Joi.string().required().min(4).max(32),
  };

  doSubmit = async () => {
    try {
      startLoading("Registering");
      await httpService.post(`${apiEndpoint}${serverUrls.register}/`, {...this.state.data});
      this.props.history.replace(urls.registerSuccess);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors, ...ex.response.data};
        this.setState({ errors });
      }
    }
  };


  render() {
    return (
      <div className={"container"}>
        <form className={"one-form"} onSubmit={this.handleSubmit} method="post">
          {/*{this.renderButton("Register With Google", "btn btn-info form-btn")}*/}
          {/*{this.renderButton("Register With Facebook", "btn btn-primary form-btn")}*/}
          <div className={"blank20"} />
          {this.renderNonFieldError()}
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email Address", "email")}
          {this.renderInput("first_name", "First Name")}
          {this.renderInput("last_name", "Last Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("re_password", "Re Type Password", "password")}
          {this.renderSubmitButton("Register", "btn btn-success form-btn")}
          <p>Registered but not activated <Link to={urls.resendActivationEmail}
                                                className="text-success">resend email</Link></p>
          <p>Already have account <Link to={urls.login} className="text-success">login</Link></p>
        </form>
      </div>
    );
  }
}

export default RegisterForm;