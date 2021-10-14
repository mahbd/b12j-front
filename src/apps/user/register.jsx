import React from "react";
import RegisterForm from "../../common/forms/registerForm";

const Register = ({history}) => {
  return (
    <div className={"one-form"}>
      <RegisterForm history={history} />
    </div>
  );
};

export default Register;