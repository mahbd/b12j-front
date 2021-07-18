import {Link} from "react-router-dom";
import React from "react";
import Input from "./fields/input";
import TextEditor from "./fields/TextEditor";
import AceEditor from "react-ace";
import isLength from "validator/es/lib/isLength";
import isEmail from "validator/es/lib/isEmail";
import isAlphanumeric from "validator/es/lib/isAlphanumeric";
import isNumeric from "validator/es/lib/isNumeric";
import isAlpha from "validator/es/lib/isAlpha";
import isDate from "validator/es/lib/isDate";
import Select from "react-select";
import http from "./httpService";
import {apiEndpoint} from "../configuration";

export function copyToClipBoard(text) {
  const input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  alert("Copied the text: " + text);
}

export const renderCol2 = (ele1, ele2) => {
  return <div className={"row"}>
    <div className="col-sm">{ele1}</div>
    <div className="col-sm">{ele2}</div>
  </div>
}

const formatHtml = (text) => {
    if (text) {
        return {__html: `${text}`}
    }
    return {__html: "<span />"}
}

export const FormattedHtml = ({text}) => <div dangerouslySetInnerHTML={formatHtml(text)}/>

export const validate = (state) => {
  const {data, schema} = state;
  let haveError = false;
  let errors = {}
  for (let [key, value] of Object.entries(schema)) {
    errors[key] = validateProperty(key, data[key], value);
    if (errors[key]) {
      haveError = true;
    }
  }
  if (haveError) {
    return errors;
  }
  return null;
}

const validateProperty = (name, value, schema) => {
  let label;
  schema.label ? label = schema.label : label = name;
  if (schema.required) {
    if (!value || value.length === 0) return `${label} can not be empty`

  }
  if (schema.length) {
    if (!isLength(value, schema.length)) {
      return `${label} length must be between ${schema.length.min} and ${schema.length.max || "infinite"}`
    }
  }
  if (schema.arrLength) {
    if (value.length < schema.arrLength.min || value.length > schema.arrLength.max) {
      return `${label} length must be between ${schema.arrLength.min} and ${schema.arrLength.max}`
    }
  }
  if (schema.email) {
    if (!isEmail(value)) return `${label} is not a valid Email.`
  }
  if (schema.alphanumeric) {
    if (!isAlphanumeric(value)) return `${label} can be only letter and number.`
  }
  if (schema.number) {
    if (!isNumeric(value)) return `${label} should contain only number.`
  }
  if (schema.alpha) {
    if (!isAlpha(value)) return `${label} should contain only letter.`
  }
  if (schema.date) {
    if (!isDate(value)) {
      return `${label} must be date`
    }
  }
  return null;
}

export const groupHandleChange = ({currentTarget}, state, setState) => {
  const {name, value} = currentTarget;
  const {data, schema, errors} = state;
  if (value === data[name]) return;
  let temErrors = {};
  const temData = {...data, [name]: value};

  // Check for errors in value
  if (schema && schema[name]) {
    const error = validateProperty(name, value, schema[name]);
    if (error) {
      if (errors) {
        temErrors = {...errors, [name]: error};
      } else {
        temErrors = {[name]: error};
      }
    }
    // Set value
      setState({...state, data: temData, errors: temErrors});
  } else {
      setState({...state, data: temData});
  }
}

export const pagination = (url, pages = 1, page = 1) => {
  let pageList = []
  if (page > 2) {
    for (let i = page - 2; i <= pages && i <= page + 2; i++) pageList.push(i);
  } else {
    for (let i = 1; i <= pages && i <= 5; i++) pageList.push(i);
  }
  return <ul className="pagination">
    {pageList.map(page => <li key={page} className="page-item">
      <Link className="page-link" to={url + page.toString()}>{page}</Link>
    </li>)}
  </ul>
}

export const renderSelect = (name, options, state, setState, multiple = false) => {
  const {data, errors, schema} = state;
  const label = (schema[name] && schema[name].label) || name;
  const error = errors[name];

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
    groupHandleChange({currentTarget: {value, name}}, state, setState)
  }

  const convertValue = () => {
    let df = false;
    if (multiple && data[name]) {
      df = [];
      for (let x of data[name]) {
        for(let y of options) {
          if (y.value === x) {
            df.push(y);
            break;
          }
        }
      }
    } else if (!multiple && data[name]) {
      for(let x of options) {
        if (x.value === data[name]) {
          df = x;
          break
        }
      }
    }
    return df;
  }

  return <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <Select value={convertValue()} isMulti={multiple} name={name} label={label} options={options}
            onChange={handleChange}/>
    {error && <div className="alert-danger">{error}</div>}
  </React.Fragment>
}

export const renderInput = (name, state, setState, type = 'text', required = false) => {
  const {data, errors, schema} = state;
  const label = (schema[name] && schema[name].label) || name;
  return <Input
    name={name}
    value={data[name]}
    label={label}
    onChange={(d) => groupHandleChange(d, state, setState)}
    error={errors[name]}
    required={required}
    type={type}
  />
}

export const renderEditor = (name, state, setState) => {
  const {data, errors, schema} = state;
  const error = errors[name];
  const label = (schema[name] && schema[name].label) || name;

  // console.log(data)
  return <TextEditor
    label={label}
    name={name}
    error={error}
    value={data[name]}
    onChange={(d) => groupHandleChange(d, state, setState)}
  />
}

export const renderCodeEditor = (name, state, setState, mode = "c_cpp", theme = "chrome", font = 20) => {
  const {data, errors, schema} = state;
  const label = (schema[name] && schema[name].label) || name;
  const onChangeCode = (newValue) => {
    groupHandleChange({currentTarget: {name: 'corCode', value: newValue}}, state, setState);
  }
  return <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <AceEditor mode={mode} value={data[name]} theme={theme}
               onChange={onChangeCode} name={name}
               fontSize={font} width={"100%"} enableBasicAutocompletion={true}
               enableLiveAutocompletion={true}
               enableSnippets={true} setOptions={{
      useWorker: false,
    }}/>
    {errors[name] && <div className={"alert-danger"}>{errors[name]}</div>}
  </React.Fragment>
}

export const submit = async (url, id, state, setState, history) => {
    try {
      if (id) {
        await http.put(`${apiEndpoint}${url}/${id}/`, state.data);
        history.push(`${url}/${id}`);
      } else {
        const res = await http.post(`${apiEndpoint}${url}/`, state.data);
        history.push(`${url}/${res.data.id}`);
      }
    } catch (e) {
      if (e.response.status === 400) {
        setState({...state, errors: e.response.data})
      } else {
        alert(`Unknown error occurred. Status: ${e.response.status}`);
      }
    }
  }
