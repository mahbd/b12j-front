import React, {useContext, useEffect, useState} from 'react';
import {SuperContext} from "../../context";
import {renderCol2, renderSelect} from "../../common/helperFunctions";
import {renderEditor, renderInput} from "../../common/helperFunctions";
import http from "../../common/httpService";
import {apiEndpoint, urls} from "../../configuration";

const ContestForm = ({match, history}) => {
  const {contestId} = match.params;
  const {contestActs, userActs} = useContext(SuperContext);
  const users = userActs.getList();
  const contest = contestActs.getById(contestId);
  const [state, setState] = useState({
    data: {}, errors: {}, schema: {
      title: {label: "Contest title"},
    }
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (contest) setState({...state, data: contest});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contest]);

  useEffect(() => {
    const rawUserList = userActs.getList();
    const userList = [];
    for (let user of rawUserList) {
      userList.push({value: user.id, label: `${user.id}: ${user.first_name} ${user.last_name} ${user.email}`});
    }
    setOptions(userList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);


  const submit = async () => {
    try {
      if (contestId) {
        await http.put(`${apiEndpoint}${urls.contests}/${contestId}/`, state.data);
        window.location = `${urls.contests}/${contestId}`
      } else {
        const res = await http.post(`${apiEndpoint}${urls.contests}/`, state.data);
        history.push(`${urls.contests}/${res.data.id}`);
      }
    } catch (e) {
      if (e.response.status === 400) {
        setState({...state, errors: e.response.data})
      } else {
        alert(`Unknown error occurred. Status: ${e.response.status}`);
      }
    }
  }

  return (
    <div>
      {contestId && <h1>Edit contest</h1>}
      {!contestId && <h1>Add contest</h1>}
      {state.errors['non_field_errors'] && <div className={"alert alert-danger"}>{state.errors['non_field_errors']}</div>}
      <br/>
      {renderCol2(renderSelect('writers', options, state, setState, true),
        renderSelect('testers', options, state, setState, true))}

      {renderInput('title', state, setState)}
      {renderCol2(renderInput('start_time', state, setState, 'datetime-local'),
        renderInput('end_time', state, setState, 'datetime-local')
      )}

      {renderEditor('text', state, setState)}
      <br/>
      <button className={"btn btn-outline-success"} onClick={submit}>Save Contest</button>
    </div>
  );
};

export default ContestForm;