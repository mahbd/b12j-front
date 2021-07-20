import React from "react";
import { getCurrentUser } from "../../common/authService";
import { Link } from "react-router-dom";
import { urls } from "../../configuration";

const Home = () => {
   const user = getCurrentUser();
   return (
      <div>
         <p className={"display-4 fw-bold text-end text-success"}>Welcome {user["full_name"]}</p>
         <div className="row">
            <div className="col-auto p-2">
               <Link to={urls.addEditContest} className="btn btn-dark">
                  New Contest
               </Link>
            </div>
            <div className="col-auto p-2">
               <Link to={`${urls.addEditContest}/5`} className="btn btn-dark">
                  Edit Contest 5
               </Link>
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
