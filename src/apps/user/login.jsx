import React from "react";
import LoginForm from "../../components/forms/loginForm";

const Login = ({history}) => {
  return (
    <div className={"one-form"}>
      <LoginForm history={history} />
    </div>
  );
};

export default Login;
