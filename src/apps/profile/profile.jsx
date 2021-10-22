import React from "react";
import { getCurrentUser } from "../../components/authService";
import { urls } from "../../configuration";
import { Slide } from "react-awesome-reveal";
import { Link} from "react-router-dom";

const Profile = ({ history }) => {
  const user = getCurrentUser();
  if (!user) {
    history.push(urls.login);
  }
  return (
    <div>
      <Slide>
        <p className={"text-center display-3 fw-bold"}>Hey, {user.name}</p>
      </Slide>
      <div className="row" id={"add-new"}>
        <div className="col-auto p-2">
          <Link to={urls.addProblem} className="btn btn-outline-dark">
            New problem
          </Link>
        </div>
        <div className="col-auto p-2">
          <a href={urls.addTutorial} className="btn btn-outline-dark">
            New tutorial
          </a>
        </div>
        <div className="col-auto p-2">
          <a href={urls.addContest} className="btn btn-outline-dark">
            Start Contest
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className={"row"}>
            <h2 className={"text-info display-4"}>Your Statistics</h2>
            <p className={"fw-bold h4 col-auto"}>Problems Solved: 10</p>
            <p className={"fw-bold h4 col-auto"}>Problems Wrote: 10</p>
            <p className={"fw-bold h4 col-auto"}>Tutorial Wrote: 10</p>
            <p className={"fw-bold h4 col-auto"}>Contest Writer: 10</p>
            <p className={"fw-bold h4 col-auto"}>Contest Tester: 10</p>
          </div>
          <div className={""}>
            <h2 className={"text-info display-4"}>Your Info</h2>
            <p className={"fw-bold h4"}>Username</p>
            <p className={"fw-bold h4"}>First Name</p>
            <p className={"fw-bold h4"}>Last Name</p>
            <p className={"fw-bold h4"}>Email</p>
          </div>
        </div>
        <div className="col-sm-6 bg-light">
          <p className={"display-1"}>Profile Image Will Be Here Blah Blah Blah</p>
        </div>
      </div>

      <div className="row" id={"add-new"}>
        <div className="col-auto p-2">
          <Link to={urls.addProblem} className="btn btn-outline-dark">
            Change Username
          </Link>
        </div>
        <div className="col-auto p-2">
          <a href={urls.addTutorial} className="btn btn-outline-dark">
            Change Password
          </a>
        </div>
        <div className="col-auto p-2">
          <a href={urls.addContest} className="btn btn-outline-dark">
            Change Name
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;