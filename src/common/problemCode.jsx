import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import httpService from "./httpService";
import { getCurrentUser } from "./authService";
import { apiEndpoint } from "../configuration";
import { SuperContext } from "../context";
import { Select } from "./fields";
import { renderColX, validate } from "./helperFunctions";
import { CodeEditor } from "./editor";

const ProblemCode = ({ problem }) => {
   const history = useHistory();
   const { submissionActs } = useContext(SuperContext);
   const [state, setState] = useState({
      data: { language: "python", theme: "chrome", font: "15px" },
      errors: {},
      schema: {
         language: {
            label: "Language",
            required: true,
            allowedValues: ["python", "c_cpp"],
         },
         code: { label: "Solution", required: true, length: { min: 10 } },
      },
   });

   const user = getCurrentUser();
   const submit = async () => {
      const language = state.data.language;

      const data = {
         code: state.data.code,
         language,
         problem: problem.id,
      };
      submissionActs.start();
      try {
         const response = await httpService.post(apiEndpoint + "/submissions/", data);
         submissionActs.failure();
         history.push(`/submissions/${response.data.id}`);
      } catch (error) {
         submissionActs.failure();
         if (error.response && error.response.status === 403) {
            window.location.reload();
         } else if (error.response) {
            console.log("This is the error reason. Please send it to Mahmudul", error.response);
            alert(`Tell this to Mahmudul: code: ${error.response.status}`);
         } else {
            console.log(error);
            alert("Couldn't submit. Sometimes server is causing this error. Check your console");
         }
      }
   };

   return (
      <div id={"codeEditor"} className={"m-2"}>
         {renderColX([
            <Select
               name={"theme"}
               state={state}
               setState={setState}
               options={[
                  { value: "chrome", label: "White" },
                  { value: "gob", label: "Dark" },
               ]}
            />,
            <Select
               name={"language"}
               state={state}
               setState={setState}
               options={[
                  { value: "python", label: "Python3.9" },
                  { value: "c_cpp", label: "C/C++" },
               ]}
            />,
            <Select
               name={"font"}
               state={state}
               setState={setState}
               options={[
                  { value: "12px", label: "12px" },
                  { value: "15px", label: "15px" },
                  { value: "18px", label: "18px" },
                  { value: "20px", label: "20px" },
               ]}
            />,
         ])}

         <CodeEditor
            name={"code"}
            mode={state.data.language}
            state={state}
            setState={setState}
            font={state.data.font}
            theme={state.data.theme}
         />
         {!user && <div className="alert alert-danger">Please login to submit</div>}
         <button disabled={!user && validate(state)} className="btn btn-success mt-2" onClick={submit}>
            Submit
         </button>
      </div>
   );
};

export default ProblemCode;
