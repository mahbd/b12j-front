import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {SuperContext} from "../../context";
import {urls} from "../../configuration";
import {pagination} from "../../common/helperFunctions";

const TutorialList = ({match}) => {
  const page = parseInt(match.params.page) || 1;
  const {tutorialActs, userActs} = useContext(SuperContext);
  const tutorials = tutorialActs.getList(page);

  const pages = tutorialActs.totalPages();

  return (
    <div className="container">
      {renderTutorialList(tutorials, userActs)}
      {pagination(`${urls.tutorials}/page=`, pages, page)}
    </div>
  );
}

export default TutorialList;


export const renderTutorialList = (tutorials, userActs) =>
  <table className="table table-bordered table-striped">
    <thead>
    <tr>
      <th>Name</th>
      <th>Writer</th>
    </tr>
    </thead>
    <tbody>
    {tutorials.map((tutorial) => <tr key={tutorial.id}>
      <td><Link to={`${urls.tutorials}/${tutorial.id}`}>{tutorial.title}</Link></td>
      <td>{userActs.fullName(tutorial.by)}</td>
    </tr>)}
    </tbody>
  </table>