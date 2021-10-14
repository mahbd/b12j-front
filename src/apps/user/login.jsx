import React from "react";
import LoginForm from "../../common/forms/loginForm";

const Login = ({history}) => {
  return (
    <div className={"one-form"}>
      <LoginForm history={history} />
    </div>
  );
};

export default Login;
