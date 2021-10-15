import React, { Component } from "react";
import Input from "../fields/input";
import Select from "../fields/select";
import Joi from "joi";
import CodeEditor from "../fields/codeEditor";
import AutocompleteSelect from "../fields/autocompleteSelect";
import TextEditor from "../fields/textEditor";

class BaseForm extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { error } = Joi.object(this.schema).validate(this.state.data, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.object(schema).validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label, cls = "btn btn-primary", extra = {}) {
    return (
      <button className={cls} {...extra}>
        {label}
      </button>
    );
  }

  renderSubmitButton(label, cls = "btn btn-primary", extra = {}) {
    return (
      <button disabled={this.validate()} className={cls} {...extra} type={"submit"}>
        {label}
      </button>
    );
  }

  convertOptions(options, valueKey, labelKey) {
    const newOptions = [];
    for (let x of options) {
      newOptions.push({value: x[valueKey], label: x[labelKey]})
    }
    return newOptions;
  }

  renderSelect(name, label, options, valueKey = "value", labelKey = "name") {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={this.convertOptions(options, valueKey, labelKey)}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderAutoCompleteSelect(name, label, options, valueKey = "value", labelKey = "name", isMulti = false) {
    const { data, errors } = this.state;
    return (
      <AutocompleteSelect
        name={name}
        label={label}
        options={this.convertOptions(options, valueKey, labelKey)}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        isMulti={isMulti}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderNonFieldError() {
    if (this.state.errors["non_field_errors"]) {
      return <div className="alert alert-danger">{this.state.errors["non_field_errors"]}</div>;
    }
  };

  renderCodeEditor(name) {
    const { language, font, theme } = this.state.data;
    return <CodeEditor
      name={name}
      value={this.state.data[name]}
      error={this.state.errors[name]}
      mode={language}
      fontSize={font}
      theme={theme}
      onChange={this.handleChange}
    />;
  };

  renderTextEditor(name, label) {
    const { data, errors } = this.state;
    return (
      <TextEditor
        name={name}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />);
  }
}

export default BaseForm;