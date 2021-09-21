import { groupHandleChange } from "./helperFunctions";
import ReactSelect from "react-select";
import React from "react";
import dayjs from "dayjs";

export const InputBase = ({
   name,
   label,
   error,
   type = "text",
   onChange,
   placeholder = "Input here",
   required = false,
   value,
}) => {
   if (type === "datetime-local" && value) {
      value = dayjs(value).format("YYYY-MM-DDTHH:mm");
   }
   return (
      <div className="form-group">
         {label && <label htmlFor="{name}">{label}</label>}
         <input
            type={type}
            value={value}
            onChange={onChange}
            id={name}
            name={name}
            className="form-control"
            autoComplete="off"
            placeholder={placeholder}
            required={required}
         />
         <p>
            <small />
         </p>
         {error && <div className="alert-danger">{error}</div>}
      </div>
   );
};

export const Select = ({ name, options, state, setState, multiple = false }) => {
   const { data, errors, schema } = state;
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
      groupHandleChange({ currentTarget: { value, name } }, state, setState);
   };

   const convertValue = () => {
      let df = false;
      if (multiple && data[name]) {
         df = [];
         for (let x of data[name]) {
            for (let y of options) {
               if (y.value === x) {
                  df.push(y);
                  break;
               }
            }
         }
      } else if (!multiple && data[name]) {
         for (let x of options) {
            if (x.value === data[name]) {
               df = x;
               break;
            }
         }
      }
      return df;
   };

   return (
      <div>
         <label htmlFor={name}>{label}</label>
         <ReactSelect
            value={convertValue()}
            isMulti={multiple}
            name={name}
            label={label}
            options={options}
            onChange={handleChange}
         />
         {error && <div className="alert-danger">{error}</div>}
      </div>
   );
};

export const Input = ({ name, state, setState, type = "text", required = false }) => {
   const { data, errors, schema } = state;
   const label = (schema[name] && schema[name].label) || name;
   return (
      <InputBase
         name={name}
         value={data[name]}
         label={label}
         onChange={(d) => groupHandleChange(d, state, setState)}
         error={errors[name]}
         required={required}
         type={type}
      />
   );
};
