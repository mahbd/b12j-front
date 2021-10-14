import React from "react";
import { groupHandleChange } from "../helperFunctions";
import ReactSelect from "react-select";

export const AutocompleteSelect = ({ name, label, options, state, setState, multiple = false }) => {
   const { data, errors } = state;
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