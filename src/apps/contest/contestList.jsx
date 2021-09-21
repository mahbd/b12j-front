import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { extractDate } from "../functions";
import { SuperContext } from "../../context";
import { css } from "../../main_css";
import { urls } from "../../configuration";
import Countdown from "react-countdown";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getTimeDifference, renderCol2 } from "../../common/helperFunctions";
import { UserListSingleRow } from "../user/userList";

dayjs.extend(isSameOrBefore);

const ContestList = () => {
   const { contestActs, userActs } = useContext(SuperContext);
   const contestList = contestActs.getList();
   let ended = [],
      upcoming = [];
   for (let contest of contestList) {
      if (dayjs(contest.end_time).isSameOrBefore(Date.now())) {
         ended.push(contest);
      } else upcoming.push(contest);
   }

   return (
      <div className="container m-2">
         <div className={css.heading4}>Current or Upcoming contests</div>
         {upcoming.map((contest) => (
            <ContestCard key={contest.id} contest={contest} userActs={userActs} />
         ))}
         <p className={"mt-5"} />
         <div className={css.heading4}>Past contests</div>
         {ended.map((contest) => (
            <ContestCard key={contest.id} contest={contest} userActs={userActs} prev={true} />
         ))}
      </div>
   );
};

export default ContestList;

export function convertContestList(contests) {
   const res = [];
   if (!contests) return res;
   for (let x of contests) {
      res.push({ value: x.id, label: x.title });
   }
   return res;
}

function ContestCard({ contest, userActs, prev = false }) {
   return (
      <div className={"card rounded-top"}>
         <div className={"card-header h4"}>
            <Link to={`${urls.contests}/${contest.id}`} className={"white-link"}>
               {contest.title}{" "}
            </Link>
         </div>

         <div className={"card-body"}>
            {renderCol2(
               <div>
                  <span className={"fw-bold"}>Writer(s)</span>
                  <UserListSingleRow users={contest.writers} userActs={userActs} />
               </div>,
               <div>
                  <span className={"fw-bold"}>Tester(s)</span>
                  <UserListSingleRow users={contest.testers} userActs={userActs} />
               </div>
            )}

            {renderCol2(
               <div>
                  {!prev && <p>Starts {extractDate(contest.start_time)}</p>}
                  {prev && <p>Ended {extractDate(contest.end_time)}</p>}
               </div>,
               <div className="col">
                  Length:
                  {getTimeDifference(contest.end_time, contest.start_time)}
               </div>
            )}

            <div className={"text-center"}>
               {dayjs().isSameOrBefore(contest.start_time) && (
                  <div>
                     <Countdown date={contest.start_time} className={"h2"} />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
