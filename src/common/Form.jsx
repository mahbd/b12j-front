import React, {Component} from 'react';
import isAlphanumeric from "validator/es/lib/isAlphanumeric";
import isAlpha from "validator/es/lib/isAlpha";
import isNumeric from "validator/es/lib/isNumeric";
import isEmail from "validator/es/lib/isEmail";
import isLength from "validator/es/lib/isLength";
import isDate from "validator/es/lib/isDate";
import Input from './fields/input';
import TextEditor from "./fields/TextEditor";
import Select from "react-select";

class Form extends Component {
  validate = () => {
    let haveError = false;
    let errors = {}
    for (let key in this.schema) {
      const data = this.state.data;
      const obj = {name: key, value: data[key]};
      errors[key] = this.validateProperty(obj);
      if (errors[key]) {
        haveError = true;
      }
    }
    if (haveError) {
      return errors;
    }
    return null;
  }

  validateProperty = ({name, value}) => {
    const schemaElement = this.schema[name];
    if (schemaElement) {
      let label;
      schemaElement.label ? label = schemaElement.label : label = name;
      if (schemaElement.required) {
        if (!value) return `${label} can not be empty`
      }
      if (schemaElement.length) {
        if (!isLength(value, schemaElement.length)) {
          return `${label} length must be between ${schemaElement.length.min} and ${schemaElement.length.max || "infinite"}`
        }
      }
      if (schemaElement.arrLength) {
        if (value.length < schemaElement.arrLength.min || value.length > schemaElement.arrLength.max) {
          return `${label} length must be between ${schemaElement.arrLength.min} and ${schemaElement.arrLength.max}`
        }
      }
      if (schemaElement.email) {
        if (!isEmail(value)) return `${label} is not a valid Email.`
      }
      if (schemaElement.alphanumeric) {
        if (!isAlphanumeric(value)) return `${label} can be only letter and number.`
      }
      if (schemaElement.number) {
        if (!isNumeric(value)) return `${label} should contain only number.`
      }
      if (schemaElement.alpha) {
        if (!isAlpha(value)) return `${label} should contain only letter.`
      }
      if (schemaElement.date) {
        if (!isDate(value)) {
          return `${label} must be date`
        }
      }
      return null;
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({errors: errors || {}});
    if (errors) return;
    this.doSubmit()
  }

  handleChange = ({currentTarget: input}) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = {...this.state.data};
    data[input.name] = input.value;
    this.setState({data, errors});
  }

  renderSubmitButton(label) {
    return (
      <button disabled={this.validate()} onClick={this.handleSubmit} className="btn btn-primary">{label}</button>
    )
  }


  renderInput(name, label, type = 'text', required=false) {
    const {data, errors} = this.state;

    return <Input
      name={name}
      value={data[name]}
      label={label}
      onChange={this.handleChange}
      error={errors[name]}
      required={required}
      type={type}
    />
  }

  renderSelect(name, options, label = '', multiple = false) {
    const error = this.state.errors[name];
    const handleChange = (input) => {
      let value;
      if (multiple) {
        value = [];
        for (let i = 0; i < input.length; i++) {
          value.push(input[i].value);
        }
      } else {
        value = input.value;
      }
      this.handleChange({currentTarget: {value, name}})
    }
    return <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <Select value={this.state.data[name]} isMulti={multiple} name={name} label={label} options={options} onChange={handleChange}/>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  }

  renderEditor(name, label) {
    const error = this.state.errors[name]
    return <TextEditor
      label={label}
      name={name}
      error={error}
      value={this.state.data[name]}
      onChange={this.handleChange}
    />
  }
}

export default Form;