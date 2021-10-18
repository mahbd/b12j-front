import React from "react";
import BaseForm from "./baseForms";
import Joi from "joi";
import { renderColX } from "../helperFunctions";
import { getCurrentUser } from "../authService";
import { startLoading } from "../loadingAnimation";
import { apiEndpoint, serverUrls, urls } from "../../configuration";
import httpService from "../httpService";

class ProblemCodeForm extends BaseForm {
  state = {
    data: { language: "python", theme: "chrome", font: "15px" },
    errors: {}
  };

  schema = {
    code: Joi.string().pattern(RegExp("^((?!bits/stdc).)*$")).required().messages(
      {'string.pattern.base': 'Can not be bits/stdc++.h header is not supported'}),
    language: Joi.required(),
    theme: Joi.required(),
    font: Joi.required()
  };

  user = getCurrentUser();
  doSubmit = async () => {
    const {history, contestId, problem} = this.props;
    const {code, language} = this.state.data;
    if (!this.user) {
      history.push(urls.login);
    }
    const data = { code, language, problem: problem.id };
    if (contestId) data['contest'] = contestId;

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
      <form method={"post"} onSubmit={this.handleSubmit}>
        {!this.user && <div className="alert alert-danger">Please login before writing code</div>}
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
        {this.renderSubmitButton("Submit")}
      </form>
    );
  }
}

export default ProblemCodeForm;