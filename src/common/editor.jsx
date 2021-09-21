import { groupHandleChange } from "./helperFunctions";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { useQuill } from "react-quilljs";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/python";

const modules = {
   toolbar: {
      container: [
         ["bold", "italic", "underline", "strike"],
         ["blockquote", "code"],
         ["link", "image"],
         [{ list: "ordered" }, { list: "bullet" }],
         [{ header: [1, 2, 3, 4, 5, 6, false] }],
         [{ script: "sub" }, { script: "super" }],
         [{ color: [] }, { background: [] }],
         [{ align: [] }],
      ],
      handlers: {
         image: function () {
            const editor = this.quill;
            const range = editor.getSelection();
            const value = prompt("Please paste the image url here.");
            if (value) {
               editor.insertEmbed(range.index, "image", value);
            }
         },
      },
   },
};

const QuillEditor = ({ onChange, name = "testEditor", label = "Hello editor", value = "", error = "" }) => {
   const { quill, quillRef } = useQuill({ modules, formats: {} });

   const [editorValue, setEditorValue] = useState(value);

   useEffect(() => {
      if (quill && value !== quill.container.firstChild.innerHTML) {
         quill.clipboard.dangerouslyPasteHTML(value);
      }
   }, [quill, value]);

   useEffect(() => {
      if (quill) {
         quill.on("text-change", () => {
            setEditorValue(quill.container.firstChild.innerHTML);
         });
      }
   }, [quill]);

   useEffect(() => {
      onChange({ currentTarget: { value: editorValue, name } });
      // eslint-disable-next-line
   }, [editorValue, name]);

   return (
      <div style={{ width: "100%", height: "auto", margin: "0.2rem" }}>
         <label htmlFor={name}>{label}</label>
         <div id={name} ref={quillRef} />
         {error && <div className="alert-danger">{error}</div>}
         <br />
      </div>
   );
};

export const CodeEditor = ({ name, state, setState, mode = "c_cpp", theme = "chrome", font = 20 }) => {
   const { data, errors, schema } = state;
   const label = (schema[name] && schema[name].label) || name;
   const onChangeCode = (newValue) => {
      groupHandleChange({ currentTarget: { name, value: newValue } }, state, setState);
   };
   return (
      <React.Fragment>
         <label htmlFor={name}>{label}</label>
         <AceEditor
            mode={mode}
            value={data[name]}
            theme={theme}
            onChange={onChangeCode}
            name={name}
            fontSize={font}
            width={"100%"}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            setOptions={{
               useWorker: false,
            }}
         />
         {errors[name] && <div className={"alert-danger"}>{errors[name]}</div>}
      </React.Fragment>
   );
};

export const TextEditor = ({ name, state, setState }) => {
   const { data, errors, schema } = state;
   const error = errors[name];
   const label = (schema[name] && schema[name].label) || name;

   // console.log(data)
   return (
      <QuillEditor
         label={label}
         name={name}
         error={error}
         value={data[name]}
         onChange={(d) => groupHandleChange(d, state, setState)}
      />
   );
};
