import React, { useContext, useEffect, useState } from "react";
import { SuperContext } from "../../context";
import { renderColX } from "../../common/helperFunctions";
import http from "../../common/httpService";
import { apiEndpoint, urls } from "../../configuration";
import { Input, AutocompleteSelect } from "../../common/fields";
import { TextEditor } from "../../common/editor";

const ContestForm = ({ match, history }) => {
   const { contestId } = match.params;
   const { contestActs, userActs } = useContext(SuperContext);
   const users = userActs.getList();
   const contest = contestActs.getById(contestId);
   const [state, setState] = useState({
      data: {},
      errors: {},
      schema: {
         title: { label: "Contest title" },
      },
   });
   const [options, setOptions] = useState([]);

   useEffect(() => {
      if (contest) setState({ ...state, data: contest });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [contest]);

   useEffect(() => {
      const rawUserList = userActs.getList();
      const userList = [];
      for (let user of rawUserList) {
         userList.push({
            value: user.id,
            label: `${user.id}: ${user.first_name} ${user.last_name} ${user.email}`,
         });
      }
      setOptions(userList);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const submit = async () => {
      try {
         if (contestId) {
            await http.put(`${apiEndpoint}${urls.contests}/${contestId}/`, state.data);
            window.location = `${urls.contests}/${contestId}`;
         } else {
            const res = await http.post(`${apiEndpoint}${urls.contests}/`, state.data);
            history.push(`${urls.contests}/${res.data.id}`);
         }
      } catch (e) {
         if (e.response.status === 400) {
            setState({ ...state, errors: e.response.data });
         } else {
            alert(`Unknown error occurred. Status: ${e.response.status}`);
         }
      }
   };

   return (
      <div>
         {contestId && <h1>Edit contest</h1>}
         {!contestId && <h1>Add contest</h1>}
         {state.errors["non_field_errors"] && (
            <div className={"alert alert-danger"}>{state.errors["non_field_errors"]}</div>
         )}
         <br />
         {renderColX([
            <AutocompleteSelect name={"writers"} options={options} state={state} setState={setState} multiple={true} />,
            <AutocompleteSelect name={"testers"} options={options} state={state} setState={setState} multiple={true} />,
         ])}

         <Input name={"title"} state={state} setState={setState} />
         {renderColX([
            <Input name={"start_time"} state={state} setState={setState} type={"datetime-local"} />,
            <Input name={"end_time"} state={state} setState={setState} type={"datetime-local"} />
         ])}
         <TextEditor name={"text"} state={state} setState={setState} />
         <button className={"btn btn-outline-success"} onClick={submit}>
            {" "}
            Save Contest
         </button>
      </div>
   );
};

export default ContestForm;
