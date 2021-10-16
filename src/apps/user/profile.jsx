import React from "react";
import { getCurrentUser } from "../../components/authService";
import { Link, useHistory } from "react-router-dom";
import { urls } from "../../configuration";

const Profile = () => {
  const currentUser = getCurrentUser();
  const history = useHistory();
  if (!currentUser) {
    history.replace(urls.login);
  }
  return (
    <div style={{width: "100%"}}>
      <h1 className={"text-center"}>Welcome {currentUser.name}</h1>
      <h2>Profile Design Is Not Complete.</h2>
      <h2>It will be updated soon .....</h2>
      <Link to={urls.addContest} className={"btn btn-success"}>Add Contest</Link>
      <Link to={urls.addProblem} className={"btn btn-success"}>Add Problem</Link>
      <Link to={urls.addTutorial} className={"btn btn-success"}>Add Tutorial</Link>

    </div>
  );
};

export default Profile;
