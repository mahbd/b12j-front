import React, { useContext, useEffect, useState } from "react";
import http from "../../components/httpService";
import { Link } from "react-router-dom";
import { apiEndpoint, urls } from "../../configuration";
import { SuperContext } from "../../context";
import { css } from "../../main_css";
import { renderProblemList } from "../problem/problemList";
import { renderSubmissionList } from "../submission/submissionList";
import { renderTutorialList } from "../tutorial/tutorialList";
import { extractDate } from "../others/functions";
import { renderColX } from "../../components/helperFunctions";
import { Table } from "../../components/customTags";
import { getCurrentUser } from "../../components/authService";
import { startLoading } from "../../components/loadingAnimation";

const Profile = ({history}) => {
   const { userActs } = useContext(SuperContext);
   const [userProbList, setUserProbList] = useState([]);
   const [userTutorialList, setUserTutorialList] = useState([]);
   const [userSubmissionList, setUserSubmissionList] = useState([]);
   const [userContest, setUserContest] = useState([]);
   const [testProblem, setTestProblem] = useState([]);
   const [unsolvedProblem, setUnsolvedProblem] = useState([]);

   const user = getCurrentUser();

   if (!user) history.push(urls.login)

   useEffect(() => {
      const apiCall = async () => {
         startLoading("Loading Problem set by user")
         const userProblemData = await http.get(`${apiEndpoint}/problems/?user_problems=true`);
         startLoading("Loading Tutorial set by user")
         const userTutorialData = await http.get(`${apiEndpoint}/tutorials/?user_tutorials=true`);
         startLoading("Loading Users submissions")
         const userSubmissionData = await http.get(`${apiEndpoint}/submissions/?user_id=${user.user_id}`);
         startLoading("Loading Contests set by user")
         const userContestData = await http.get(`${apiEndpoint}/contests/?user_contests=true`);
         startLoading("Loading Testable problems")
         const testProblemData = await http.get(`${apiEndpoint}/problems/?test_problems=true`);
         startLoading("Loading Unsolved problems")
         const unsolvedProblemData = await http.get(`${apiEndpoint}/problems/?unsolved_problems=true`);
         setUnsolvedProblem(unsolvedProblemData.data.results);
         setUserTutorialList(userTutorialData.data.results);
         setUserProbList(userProblemData.data.results);
         setUserSubmissionList(userSubmissionData.data.results);
         setUserContest(userContestData.data.results);
         setTestProblem(testProblemData.data.results);
         console.log(unsolvedProblemData)
      };
      apiCall();
      console.log("Reloading API")
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const contestData = [];
   for (let contest of userContest) {
      contestData.push([
         <Link to={`${urls.contests}/${contest.id}`}>{contest.title}</Link>,
         extractDate(contest.date),
         <a href={`${urls.editContest}/${contest.id}`} className="btn-sm btn-warning me-2">
            Edit
         </a>,
      ]);
   }

   return (
      <div>
         <div className="row">
            <div className="col-auto p-2">
               <Link to={urls.addProblem} className="btn btn-outline-success">
                  Add new problem
               </Link>
            </div>
            <div className="col-auto p-2">
               <a href={urls.addTutorial} className="btn btn-outline-success">
                  Add new tutorial
               </a>
            </div>
         </div>

         <br />
         <br />
         <br />
         {renderColX([
            <div className="col-sm">
               <div className={css.heading4}>Last 10 Contests set by you</div>
               <Table headers={["Title", "Date", "Buttons"]} body={contestData} />
            </div>,
            <div>
               <div className={css.heading4}>Testable problem for you</div>
               {renderProblemList(testProblem, urls.problems)}
            </div>,
         ])}

         {renderColX([
            <div>
               <div className={css.heading4}>Last 10 Problem set by you</div>
               {renderProblemList(userProbList, urls.problems)}
            </div>,
            <div className="col-sm">
               <div className={css.heading4}>Last 10 tutorials by you</div>
               {renderTutorialList(userTutorialList, userActs)}
            </div>,
         ])}
         {renderColX([
            <div>
               <div className={css.heading4}>Unsolved problems</div>
               {renderProblemList(unsolvedProblem, urls.problems)}
            </div>,
            <div className="col-sm">
               <div className={css.heading4}>Last submissions</div>
               {renderSubmissionList(userSubmissionList, userActs)}
            </div>,
         ])}
      </div>
   );
};

export default Profile;
