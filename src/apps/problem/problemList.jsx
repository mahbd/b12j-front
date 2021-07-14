import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {SuperContext} from "../../context";
import {pagination} from "../../common/helperFunctions";
import {urls} from "../../configuration";

const ProblemList = ({match}) => {
  const page = parseInt(match.params.page) || 1;
  const {problemActs} = useContext(SuperContext);
  let problems = problemActs.getList(page);

  const pages = problemActs.totalPages();

  return (
    <div className="container">
      {renderProblemList(problems)}
      {pagination(`${urls.problems}/page=`, pages, page)}
    </div>
  );
}

export default ProblemList;

export const renderProblemList = (problems) =>
  <table className="table table-bordered table-striped">
    <thead>
    <tr>
      <th>Name</th>
      <th>Difficulty</th>
    </tr>
    </thead>
    <tbody>
    {problems.map((problem) => <tr key={problem.id}>
      <td><Link to={`/problems/${problem.id}`}>{problem.title}</Link></td>
      <td>{problem.difficulty}</td>
    </tr>)}
    </tbody>
  </table>
