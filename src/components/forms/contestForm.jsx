import React from "react";
import BaseForm from "./baseForms";
import { renderColX } from "../helperFunctions";
import Joi from "joi";
import http from "../httpService";
import { apiEndpoint, urls } from "../../configuration";
import { startLoading} from "../loadingAnimation";

class ContestForm extends BaseForm {
  state = {
    data: {},
    errors: {}
  };

  schema = {
    writers: Joi.array().required(),
    testers: Joi.array().required(),
    title: Joi.string().required().min(5).max(120).label("Contest Name"),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    description: Joi.string()
  };

  componentDidMount() {
    if (this.props.contest) {
      this.setState({ ...this.state.data, ...this.props.contest });
    }
  }


  doSubmit = async () => {
    const { data } = this.state;
    const {history} = this.props;
    try {
      if (data.id) {
        startLoading("Saving contest")
        await http.put(`${apiEndpoint}${urls.contests}/${data.id}/`, data);
        history.push(`${urls.contests}/${data.id}`);
      } else {
        startLoading("Creating new contest")
        const res = await http.post(`${apiEndpoint}${urls.contests}/`, data);
        history.push(`${urls.contests}/${res.data.id}`);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors, ...ex.response.data};
        this.setState({ errors });
      }
    }
  };

  render() {
    const { users } = this.props;
    return (
      <form onSubmit={this.handleSubmit} method={"post"}>
        {this.renderNonFieldError()}
        {renderColX([
          this.renderAutoCompleteSelect("writers", "Contest Writers", users, "id", "username", true),
          this.renderAutoCompleteSelect("testers", "Contest Testers", users, "id", "username", true)
        ])}
        {this.renderInput("title", "Contest Name")}
        {renderColX([
          this.renderInput("start_time", "Start Time", "datetime-local"),
          this.renderInput("end_time", "End Time", "datetime-local")
        ])}
        {this.renderTextEditor("description", "Description")}
        {this.renderSubmitButton("Save Contest")}
      </form>
    );
  }
}

export default ContestForm;