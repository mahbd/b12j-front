import React, {useContext, useEffect, useState} from 'react';
import http from "../../common/httpService";
import {Link} from "react-router-dom";
import {logout} from "../../common/authService";
import {apiEndpoint, urls} from "../../configuration";
import {SuperContext} from "../../context";

const Profile = () => {
  const {problemActs} = useContext(SuperContext);
  const [userProbList, setUserProbList] = useState([]);
  const [userSubmissionList, setUserSubmissionList] = useState([]);
  const [userContest, setUserContest] = useState([]);
  const [testProblem, setTestProblem] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      problemActs.start(); // Start Load animation
      const userProblemData = await http.get(`${apiEndpoint}/problems/user_problems/`);
      const userSubmissionData = await http.get(`${apiEndpoint}/submissions/user_submissions/`);
      const userContestData = await http.get(`${apiEndpoint}/contests/user_contests/`);
      const testProblemData = await http.get(`${apiEndpoint}/problems/test_problems/`);
      problemActs.failure(); // Stop Load animation
      setUserProbList(userProblemData.data.results);
      setUserSubmissionList(userSubmissionData.data.results);
      setUserContest(userContestData.data.results);
      setTestProblem(testProblemData.data.results);
    }
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="container">
      <div className={"row pb-5"}>
        <div className={"col"}/>
        <div className={"col-auto"}>
          <button className="btn btn-danger" onClick={() => logout('/')}>Logout</button>
          <a className="btn btn-success" href={"/users/password_change/"}>Change Password</a></div>
      </div>

      <div className="row">
        <div className="col-auto p-2">
          <Link to={urls.addProblem} className="btn btn-dark">Add new problem</Link>
        </div>
        <div className="col-auto p-2">
          <button className="btn btn-dark">Announcements</button>
        </div>
        <div className="col-auto p-2">
          <button className="btn btn-dark">Tutorials</button>
        </div>
        <div className="col-auto p-2">
          <button className="btn btn-dark">Submissions</button>
        </div>
        <div className="col-auto p-2">
          <button className="btn btn-dark">Your Submissions</button>
        </div>
      </div>

      <br/><br/><br/>
      <div className="row">
        <div className="col-sm">
          <b>Contest set by you</b>
          <table className="table table-striped table-bordered">
            <thead>
            <tr>
              <th>Title</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {userContest.map(contest => <tr key={contest.id}>
              <td><Link to={`${urls.contests}/${contest.id}`}>{contest.title}</Link><span>
                                <Link to={`${urls.addEditContest}/${contest.id}`} className="btn-sm btn-warning">
                                edit</Link>
                            </span></td>
              <td><Link to={`/problems/add/${contest.id}`} className="btn-sm btn-success">Add
                problem</Link></td>
            </tr>)}
            </tbody>
          </table>
        </div>
        <div className="col-sm">
          <b>Testable problem for you</b>
          <table className="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Title</th>
              <th>Contest</th>
            </tr>
            </thead>
            <tbody>
            {testProblem.map(problem => <tr key={problem.id}>
              <td><Link to={`/problems/${problem.id}`}>{problem.title}</Link></td>
              <td>{problem.contest}</td>
            </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <b>Last 20 Problem set by you</b>
          <table className="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {userProbList.map(problem => <tr key={problem.id}>
              <td>
                <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
                <Link to={`${urls.editProblem}/${problem.id}`} className={"btn-sm btn-warning"}>edit</Link>
              </td>
            </tr>)}
            </tbody>
          </table>
        </div>
        <div className="col-sm">
          <b>Last 20 submissions by you</b>
          <table className="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Contest</th>
              <th>Problem</th>
              <th>Verdict</th>
            </tr>
            </thead>
            <tbody>
            {userSubmissionList.map(submission => <tr key={submission.id}>
              <td>{submission.contest}</td>
              <td>{submission.problem}</td>
              <td><Link to={`/submissions/${submission.id}`}>{submission.verdict}</Link></td>
            </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;