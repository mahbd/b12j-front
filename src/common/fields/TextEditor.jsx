import React from 'react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: {
    'container': [['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code'], ['link', 'image'], [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}], [{'script': 'sub'}, {'script': 'super'}],
      [{'color': []}, {'background': []}], [{'align': []}]],
    handlers: {
      image: function () {
        const editor = this.quill;
        const range = editor.getSelection();
        const value = prompt('Please paste the image url here.');
        if (value) {
          editor.insertEmbed(range.index, 'image', value);
        }
      }
    }
  },
}

export const TextEditor = ({onChange, name = "testEditor", label = "Hello editor", value = "", error = ""}) => {
  const handleChange = (value) => {
    onChange({currentTarget: {name: name, value: value}});
  }
  return (
    <div className="text-editor">
      <label htmlFor={name}>{label}</label>
      <ReactQuill id={name} value={value} theme="snow" onChange={handleChange} modules={modules}/>
      {error && <div className="alert-danger">{error}</div>}
    </div>
  );
}

export default TextEditor;