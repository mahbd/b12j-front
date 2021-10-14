import React from "react";
import AceEditor from "react-ace";

const CodeEditor = ({ name, label, onChange, error, ...rest }) => {
  const onChangeCode = (newValue) => {
    onChange({ currentTarget: { name, value: newValue } });
  };
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <AceEditor {...rest}
        onChange={onChangeCode}
        name={name}
        width={"100%"}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        setOptions={{
          useWorker: false
        }}
      />
      {error && <div className={"alert-danger"}>{error}</div>}
    </React.Fragment>
  );
};

export default CodeEditor