import React from "react";
import BaseForm from "./baseForms";
import Joi from "joi";
import { serverUrls, urls } from "../../configuration";

class TestCaseForm extends BaseForm {
  state = {
    data: {},
    errors: {}
  };
  schema = {
    inputs: Joi.string().required()
  };

  doSubmit = () => {
    this.setState({data: {...this.state.data, problem: this.props.problem.id}});
    this.doSubmitHelper(serverUrls.test_cases, undefined, "Adding Test Case");
    window.location = `${urls.test_cases}/${this.props.problem.id}`
  }

  render() {
    return (
      <form method={"post"} onSubmit={this.handleSubmit}>
        {this.renderTextArea("inputs", "Input")}
        {this.renderSubmitButton("Submit")}
      </form>
    );
  }
}

export default TestCaseForm;