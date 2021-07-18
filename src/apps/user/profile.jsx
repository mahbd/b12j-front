import React, {useContext, useEffect, useState} from 'react';
import http from "../../common/httpService";
import {Link} from "react-router-dom";
import {logout} from "../../common/authService";
import {apiEndpoint, urls} from "../../configuration";
import {SuperContext} from "../../context";
import {css} from "../../main_css";
import {renderProblemList} from "../problem/problemList";
import {renderSubmissionList} from "../submission/submissionList";
import {renderCol2} from "../../common/helperFunctions";
import {renderTutorialList} from "../tutorial/tutorialList";
import {extractDate} from "../functions";

const Profile = () => {
  const {problemActs, userActs} = useContext(SuperContext);
  const [userProbList, setUserProbList] = useState([]);
  const [userTutorialList, setUserTutorialList] = useState([]);
  const [userSubmissionList, setUserSubmissionList] = useState([]);
  const [userContest, setUserContest] = useState([]);
  const [testProblem, setTestProblem] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      problemActs.start(); // Start Load animation
      const userProblemData = await http.get(`${apiEndpoint}/problems/user_problems/`);
      const userTutorialData = await http.get(`${apiEndpoint}/tutorials/user_tutorials/`);
      const userSubmissionData = await http.get(`${apiEndpoint}/submissions/user_submissions/`);
      const userContestData = await http.get(`${apiEndpoint}/contests/user_contests/`);
      const testProblemData = await http.get(`${apiEndpoint}/problems/test_problems/`);
      problemActs.failure(); // Stop Load animation
      setUserTutorialList(userTutorialData.data.results);
      setUserProbList(userProblemData.data.results);
      setUserSubmissionList(userSubmissionData.data.results);
      setUserContest(userContestData.data.results);
      setTestProblem(testProblemData.data.results);
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div className={"row pb-5"}>
        <div className={"col"}/>
        <div className={"col-auto"}>
          <button className="btn btn-danger" onClick={() => logout('/')}>Logout</button>
          <a className="btn btn-success" href={"/users/password_change/"}>Change Password</a></div>
      </div>

      <div className="row">
        <div className="col-auto p-2">
          <Link to={urls.addProblem} className="btn btn-outline-success">Add new problem</Link>
        </div>
        <div className="col-auto p-2">
          <a href={urls.addTutorial} className="btn btn-outline-success">Add new tutorial</a>
        </div>
      </div>

      <br/><br/><br/>
      {renderCol2(
        <div className="col-sm">
          <div className={css.heading4}>Last 10 Contests set by you</div>
          <table className="table table-bordered table-striped">
            <thead>
            <tr>
              <th className={"bg-dark rounded-3 text-white"}>Title</th>
              <th className={"bg-dark rounded-3 text-white"}>Date</th>
              <th className={"bg-dark rounded-3 text-white"}>Buttons</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {userContest.map(contest => <tr key={contest.id}>
              <td><Link to={`${urls.contests}/${contest.id}`}>{contest.title}</Link><span>
                            </span></td>
              <td>{extractDate(contest.date)}</td>
              <td>
                <a href={`${urls.addEditContest}/${contest.id}`} className="btn-sm btn-warning me-2">Edit</a>
              </td>
            </tr>)}
            </tbody>
          </table>
        </div>,
        <div>
          <div className={css.heading4}>Testable problem for you</div>
          {renderProblemList(testProblem, urls.problems)}</div>)}


      {renderCol2(
        <div>
          <div className={css.heading4}>Last 10 Problem set by you</div>
          {renderProblemList(userProbList, urls.problems)}</div>,
        <div className="col-sm">
          <div className={css.heading4}>Last 10 tutorials by you</div>
          {renderTutorialList(userTutorialList, userActs)}
        </div>)}
      <div className={css.heading4}>Last 20 submissions by you</div>
      {renderSubmissionList(userSubmissionList, userActs)}
    </div>
  );
};

export default Profile;