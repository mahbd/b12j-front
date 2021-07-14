import React, {useContext} from 'react';
import {SuperContext} from "../../context";
import {Link} from "react-router-dom";

const Submission = ({match}) => {
  const {submissionId} = match.params;
  const {submissionActs, userActs, problemActs} = useContext(SuperContext);
  const submission = submissionActs.getById(submissionId);

  // const contestEnd = new Date((contest && contest.end_time) || Date.now().toLocaleString());
  // const currentUser = getCurrentUser() && getCurrentUser().id;

  return (
    submission && <div className="container pt-2">
      <table className={"table table-bordered"}>
        <thead>
        <tr>
          <th className={"bg-dark text-white"}>ID</th>
          <th className={"bg-dark text-white"}>Problem</th>
          <th className={"bg-dark text-white"}>Submitter</th>
          <th className={"bg-dark text-white"}>Language</th>
          <th className={"bg-dark text-white"}>Verdict</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{submissionId}</td>
          <td><Link to={`/problems/${submission.problem}`}>{problemActs.getById(submission.problem, 'title')}</Link>
          </td>
          <td>{userActs.fullName(submission.by)}</td>
          <td>Language</td>
          <td>{verdictProcess(submission.verdict)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Submission;


const verdictProcess = verdict => {
  if (verdict === 'AC') return <span className="text-success">Accepted</span>
  if (verdict === 'WA') return <span className="text-danger">Wrong Answer</span>
  if (verdict === 'CE') return <span className="text-danger">Compilation Error</span>
  if (verdict === 'TLE') return <span className="text-danger">Time Limit Exceed</span>
  if (verdict === 'PJ') return <span className="text-info">Judging.</span>
  if (verdict === 'FJ') return <span className="text-danger">Failed.</span>
  return <span>Unknown verdict</span>
}