import React, { useContext, useState, useEffect } from "react";
import { SuperContext } from "../../context";
import { urls } from "../../configuration";
import { renderColX, submit, validate } from "../../common/helperFunctions";
import { Input } from "../../common/fields";
import { TextEditor } from "../../common/editor";

const ProblemForm = ({ match, history }) => {
   const { problemId } = match.params;
   const { problemActs } = useContext(SuperContext);
   const problem = problemActs.getById(problemId);
   const [state, setState] = useState({
      data: { time_limit: 1, memory_limit: 256, examples: 1, difficulty: 1500 },
      errors: {},
      schema: {
         title: { label: "Problem title", required: true },
         text: { label: "Problem statement", required: true, length: { min: 50 } },
         inTerms: { label: "Input terms", required: true, length: { min: 20 } },
         outTerms: { label: "Output terms", required: true, length: { min: 20 } },
         corCode: { label: "Correct code", required: true },
      },
   });

   useEffect(() => {
      if (problem) setState({ ...state, data: { ...problem } });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [problem]);

   const submitNow = async () => {
      await submit(urls.problems, problemId, state, setState, history);
   };

   return (
      <div className="container mb-5 mt-5">
         {problemId && (
            <div>
               <h1>Edit problem {problem && problem.title}</h1>
            </div>
         )}
         {!problemId && <h1>Add problem</h1>}
         <Input name={"title"} state={state} setState={setState} />
         <TextEditor name={"text"} state={state} setState={setState} />
         <TextEditor name={"inTerms"} state={state} setState={setState} />
         <TextEditor name={"outTerms"} state={state} setState={setState} />
         <TextEditor name={"corCode"} state={state} setState={setState} />

         <h3 className="text-info">Optionals</h3>
         <TextEditor name={"notice"} state={state} setState={setState} />
         {renderColX([
            <Input name={"time_limit"} state={state} setState={setState} type={"number"} />,
            <Input name={"memory_limit"} state={state} setState={setState} type={"number"} />,
         ])}
         {renderColX([
            <Input name={"difficulty"} state={state} setState={setState} type={"number"} />,
            <Input name={"examples"} state={state} setState={setState} type={"number"} />,
         ])}

         <button className="btn btn-success" disabled={validate(state)} onClick={submitNow}>
            Submit Problem
         </button>
      </div>
   );
};

export default ProblemForm;
