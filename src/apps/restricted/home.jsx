import React from 'react';
import {getCurrentUser} from "../../common/authService";
import {Link} from "react-router-dom";
import {urls} from "../../configuration";

const Home = () => {
  const user = getCurrentUser()
  console.log(user)
  return (
    <div>
      <p className={"display-4 fw-bold text-end text-success"}>Welcome {user['full_name']}</p>
      <div className="row">
        <div className="col-auto p-2">
          <Link to={urls.addEditContest} className="btn btn-dark">New Contest</Link>
        </div>
        <div className="col-auto p-2">
          <button className="btn btn-dark">New Problem</button>
        </div>
        <div className="col-auto p-2">
          <button className="btn btn-dark">New Tutorial</button>
        </div>
      </div>
    </div>
  );
};

export default Home;