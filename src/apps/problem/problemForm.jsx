import React, {useContext, useState, useEffect} from 'react';
import {SuperContext} from "../../context";
import http from "../../common/httpService";
import {apiEndpoint, urls} from "../../configuration";
import {renderCodeEditor, renderCol2, renderEditor, renderInput, validate} from "../../common/helperFunctions";

const ProblemForm = ({match, history}) => {
  const {problemId} = match.params;
  const {problemActs} = useContext(SuperContext);
  const problem = problemActs.getById(problemId);
  const [state, setSate] = useState({
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
    if (problem) setSate({...state, data: {...problem}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem])

  const submit = async () => {
    try {
      if (problemId) {
        await http.put(`${apiEndpoint}${urls.problems}/${problemId}/`, state.data);
        history.push(`${urls.problems}/${problemId}`);
      } else {
        const res = await http.post(`${apiEndpoint}${urls.problems}/`, state.data);
        history.push(`${urls.problems}/${res.data.id}`);
      }
    } catch (e) {
      if (e.response.status === 400) {
        setSate({...state, errors: e.response.data})
      } else {
        alert(`Unknown error occurred. Status: ${e.response.status}`);
      }
    }
  }

  return (
    <div className="container pt-5">
      {problemId && <div>
        <h1>Edit problem {problem && problem.title}</h1>
      </div>}
      {!problemId && <h1>Add problem</h1>}
      {renderInput('title', state, setSate)}
      {renderEditor('text', state, setSate)}
      {renderEditor('inTerms', state, setSate)}
      {renderEditor('outTerms', state, setSate)}
      {renderCodeEditor("corCode", state, setSate)}

      <hr/> <hr/> <hr/>
      <h3 className="text-info">Optionals</h3>
      {renderEditor('notice', state, setSate)}
      {renderCol2(renderInput('time_limit', state, setSate, 'number'),
        renderInput('memory_limit', state, setSate, 'number'))}
      {renderCol2(renderInput('difficulty', state, setSate, 'number'),
        renderInput('examples', state, setSate, 'number'))}


      <button className="btn btn-success" onClick={submit}>Submit Problem</button>
      <br/><br/><br/>
    </div>
  );
};

export default ProblemForm;