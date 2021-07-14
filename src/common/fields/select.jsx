import React, {Fragment} from 'react';
import Select from "react-select";

const ReactSelect = (name, options, onChange, label = '', multiple = false, df = false, error = false) => {
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
    onChange({currentTarget: {value, name}})
  }
  console.log('Trying to render');

  return <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <Select defaultValue={df} isMulti={multiple} name={name} label={label} options={options}
            onChange={handleChange}/>
    {error && <div className="alert alert-danger">{error}</div>}
  </React.Fragment>
}

export default ReactSelect;

export const SelectSimple = ({name, label, options, onChange}) => {
  return <Fragment>
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </Fragment>
}
