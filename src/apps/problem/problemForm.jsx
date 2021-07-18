import React, {useContext, useState, useEffect} from 'react';
import {SuperContext} from "../../context";
import {urls} from "../../configuration";
import {renderCodeEditor, renderCol2, renderEditor, renderInput, submit, validate} from "../../common/helperFunctions";

const ProblemForm = ({match, history}) => {
  const {problemId} = match.params;
  const {problemActs} = useContext(SuperContext);
  const problem = problemActs.getById(problemId);
  const [state, setState] = useState({
    data: {time_limit: 1, memory_limit: 256, examples: 1, difficulty: 1500},
    errors: {},
    schema: {
      title: {label: "Problem title", required: true},
      text: {label: "Problem statement", required: true, length: {min: 50}},
      inTerms: {label: "Input terms", required: true, length: {min: 20}},
      outTerms: {label: "Output terms", required: true, length: {min: 20}},
      corCode: {label: "Correct code", required: true},
    }
  });

  useEffect(() => {
    if (problem) setState({...state, data: {...problem}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem])

  const submitNow = async () => {
    await submit(urls.problems, problemId, state, setState, history);
  }

  return (
    <div className="container pt-5">
      {problemId && <div>
        <h1>Edit problem {problem && problem.title}</h1>
      </div>}
      {!problemId && <h1>Add problem</h1>}
      {renderInput('title', state, setState)}
      {renderEditor('text', state, setState)}
      {renderEditor('inTerms', state, setState)}
      {renderEditor('outTerms', state, setState)}
      {renderCodeEditor("corCode", state, setState)}

      <hr/> <hr/> <hr/>
      <h3 className="text-info">Optionals</h3>
      {renderEditor('notice', state, setState)}
      {renderCol2(renderInput('time_limit', state, setState, 'number'),
        renderInput('memory_limit', state, setState, 'number'))}
      {renderCol2(renderInput('difficulty', state, setState, 'number'),
        renderInput('examples', state, setState, 'number'))}


      <button className="btn btn-success" disabled={validate(state)} onClick={submitNow}>Submit Problem</button>
      <br/><br/><br/>
    </div>
  );
};

export default ProblemForm;