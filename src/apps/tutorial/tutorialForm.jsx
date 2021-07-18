import React, {useContext, useEffect, useState} from 'react';
import {SuperContext} from "../../context";
import {apiEndpoint, urls} from "../../configuration";
import {renderCol2, renderEditor, renderInput, renderSelect, submit, validate} from "../../common/helperFunctions";
import {convertProblemList} from "../problem/problemList";
import {convertContestList} from "../contest/contestList";
import http from "../../common/httpService";

const TutorialForm = ({match, history}) => {
  const {tutorialId} = match.params;
  const {tutorialActs, contestActs} = useContext(SuperContext);
  const [problems, setProblems] = useState([]);
  const contests = contestActs.getAllList();
  const tutorial = tutorialActs.getById(tutorialId);
  const [state, setState] = useState({
    data: {},
    errors: {},
    schema: {
      title: {label: "Tutorial name", required: true, length: {min: 5, max: 100}},
      tags: {label: "Tutorial tags"},
      contest: {label: "Contest name"},
      problem: {label: "Problem name"},
      text: {label: "Tutorial content", required: true},
      hidden_till: {label: "Tutorial should be hidden till", required: true}
    }
  });

  useEffect(() => {
    const apiCall = async () => {
      const userProblemData = await http.get(`${apiEndpoint}/problems/user_problems/?all=true `);
      setProblems(userProblemData.data.results);
    }
    apiCall();
  }, [])

  useEffect(() => {
    if (tutorial) setState({...state, data: {...tutorial}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial]);

  const submitNow = async () => {
    await submit(urls.tutorials, tutorialId, state, setState, history);
  }

  return (
    <div className={"container pt-5"}>
      {tutorialId && <div>
        <h1>Edit tutorial {tutorial && tutorial.title}</h1>
      </div>}
      {!tutorialId && <h1>Add tutorials</h1>}
      {renderInput('title', state, setState)}
      {renderEditor('text', state, setState)}
      {renderInput('hidden_till', state, setState, 'datetime-local')}
      {renderCol2(renderSelect('contest', convertContestList(contests), state, setState),
        renderSelect('problem', convertProblemList(problems), state, setState))}
      <button className="btn btn-success" disabled={validate(state)} onClick={submitNow}>Submit Tutorial</button>
    </div>
  );
};

export default TutorialForm;