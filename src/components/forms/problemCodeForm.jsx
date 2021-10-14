import React from "react";
import BaseForm from "./baseForms";
import Joi from "joi";
import { renderColX } from "../helperFunctions";
import { getCurrentUser } from "../authService";
import { startLoading } from "../loadingAnimation";
import { apiEndpoint, serverUrls } from "../../configuration";
import httpService from "../httpService";

class ProblemCodeForm extends BaseForm {
  state = {
    data: { language: "python", theme: "chrome", font: "15px" },
    errors: {}
  };

  schema = {
    code: Joi.required(),
    language: Joi.required(),
    theme: Joi.required(),
    font: Joi.required()
  };

  user = getCurrentUser();
  doSubmit = async () => {
    const data = {
      code: this.state.data.code,
      language: this.state.data.language,
      problem: this.props.problem.id
    };
    startLoading("Submitting Code")
    try {
      const response = await httpService.post(`${apiEndpoint}${serverUrls.submissions}/`, data);
      this.props.history.push(`/submissions/${response.data.id}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        window.location.reload();
      }
    }
  };

  render() {
    return (
      <div>
        {renderColX([
          this.renderSelect("theme", "",
            [{ value: "chrome", name: "White" }, { value: "gob", name: "Dark" }]),
          this.renderSelect("language", "",
            [{ value: "python", name: "Python3.9" }, { value: "c_cpp", name: "C/C++" }]),
          this.renderSelect("font", "",
            [{ value: "12px", name: "12px" },
              { value: "15px", name: "15px" },
              { value: "18px", name: "18px" },
              { value: "20px", name: "20px" }])
        ])}
        {this.renderCodeEditor("code")}
        {!this.user && <div className="alert alert-danger">Please login to submit</div>}
        {this.renderSubmitButton("Submit")}
      </div>
    );
  }
}

export default ProblemCodeForm;