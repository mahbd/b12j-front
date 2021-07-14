import React, {useContext, useEffect, useState} from 'react';
import {SuperContext} from "../../context";
import {renderCol2, renderSelect} from "../../common/helperFunctions";
import {renderEditor, renderInput} from "../../common/helperFunctions";

const ContestForm = ({match}) => {
  const {contestId} = match.params;
  const {contestActs, userActs} = useContext(SuperContext);
  const users = userActs.getList();
  const contest = contestActs.getById(contestId);
  const [state, setState] = useState({
    data: {}, errors: {}, schema: {
      title: {label: "Contest title", required: true},
    }
  });
  const [options, setOptions] = useState([]);

  const convertDefaultUsers = (users) => {
    if (!users) return false;
    const userList = [];
    for (let x of users) {
      const user = userActs.getById(x);
      if (user) userList.push({value: user.id, label: `${user.id}: ${user.first_name} ${user.last_name} ${user.email}`});
    }
    console.log(userList);
    return userList;
  }

  useEffect(() => {
    if (contest) setState({...state, data: contest});
  }, [contest]);

  useEffect(() => {
    const rawUserList = userActs.getList();
    const userList = [];
    for (let user of rawUserList) {
      userList.push({value: user.id, label: `${user.id}: ${user.first_name} ${user.last_name} ${user.email}`});
    }
    setOptions(userList);
  }, [users]);


  return (
    <div>
      <h1>Edit contest</h1>
      <br/>
      {renderCol2(renderSelect('writers', options, state, setState, true, convertDefaultUsers(state.data.writers)),
        renderSelect('testers', options, state, setState, true))}

      {renderInput('title', state, setState)}
      {renderCol2(renderInput('start_time', state, setState, 'datetime-local'),
        renderInput('end_time', state, setState, 'datetime-local')
      )}

      {renderEditor('text', state, setState)}
      <br/>
      <button className={"btn btn-outline-success"}>Save Contest</button>
    </div>
  );
};

export default ContestForm;