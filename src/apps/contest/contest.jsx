import React, { useContext } from "react";
import { renderProblemList } from "../problem/problemList";
import Countdown from "react-countdown";
import TutorialList from "../tutorial/tutorialList";
import { SuperContext } from "../../context";
import { FormattedHtml } from "../../common/helperFunctions";
import { MultiButton } from "../../common/customTags";
import { UserListSingleRow } from "../user/userList";

const Contest = ({ match }) => {
   const { contestId } = match.params;
   const { contestActs, userActs, problemActs } = useContext(SuperContext);
   const contest = contestActs.getById(contestId);
   let problems = [];
   if (contestId) {
      problems = problemActs.contestProblems(contestId);
   }

   const contestStart = new Date((contest && contest.start_time) || Date.now().toLocaleString());
   const contestEnd = new Date((contest && contest.end_time) || Date.now().toLocaleString());

   const multiButtonMap = [
      {
         type: "link",
         label: "Standing",
         link: `/contests/standing/${contestId}`,
      },
   ];

   return (
      <div className="container">
         {contest && (
            <div>
               <div className={"pt-2"}>
                  <div className={"row"}>
                     <div className="col" />
                     <div className="display-4 fw-bold text-secondary col-auto rounded-3">{contest.title}</div>
                     <div className="col" />
                  </div>
                  <br />
                  <MultiButton schema={multiButtonMap} />
               </div>

               {contestStart > Date.now() && (
                  <div className={"pt-5 pb-5 text-center"}>
                     <p className={"h1"}>Starts in: </p>
                     <Countdown date={contest.start_time} className="h1" />
                  </div>
               )}

               <div>
                  <h2>About contest</h2>
                  <div>{contest.text && <FormattedHtml text={contest.text} />}</div>
                  <h3>Writers</h3>
                  <UserListSingleRow users={contest.writers} userActs={userActs} />
                  <h3>Testers</h3>
                  <UserListSingleRow users={contest.testers} userActs={userActs} />
                  <br />
               </div>
            </div>
         )}

         {contestStart <= Date.now() && (
            <div>
               <h2>Problems</h2>
               {renderProblemList(problems)}
            </div>
         )}

         {contestEnd <= Date.now() && (
            <div>
               <h2>Tutorials</h2>
               <TutorialList match={match} />
            </div>
         )}
      </div>
   );
};
export default Contest;
