import React, { useContext } from "react";
import { renderProblemList } from "../problem/problemList";
import Countdown from "react-countdown";
import { SuperContext } from "../../context";
import { FormattedHtml, renderColX } from "../../components/helperFunctions";
import { UserListSingleRow } from "../user/userList";

const Contest = ({ match }) => {
  const { contestId } = match.params;
  const { contestActs, userActs, problemActs } = useContext(SuperContext);
  const contest = contestActs.getById(contestId);
  let problems = [];
  if (contestId) {
    problems = problemActs.contestProblems(contestId) || [];
  }

  const contestStart = new Date((contest && contest.start_time) || Date.now().toLocaleString());
  const contestEnd = new Date((contest && contest.end_time) || Date.now().toLocaleString());

  return (contest &&
    <div className={"container m-2"}>
      <div>
        <div className={"pt-2"}>
          <div className={"row"}>
            <div className="col" />
            <div className="display-4 fw-bold text-secondary col-auto rounded-3">{contest.title}</div>
            <div className="col" />
          </div>
          <br />
        </div>

        <div>
          {contest.description && <div><h2>About contest</h2>
            <div><FormattedHtml text={contest.description} /></div>
            <br /><br /><br /></div>
          }
          {renderColX(
            [<div><h3>Writers</h3>
              <UserListSingleRow users={contest.writers} userActs={userActs} />
            </div>,
              <div>
                <h3>Testers</h3>
                <UserListSingleRow users={contest.testers} userActs={userActs} />
              </div>
            ]
          )}

        </div>
      </div>

      {problems.length > 0 && contestStart <= Date.now() && (
        <div>
          <h2>Problems</h2>
          {renderProblemList(problems)}
          {contestEnd <= Date.now() && <button>Tutorials</button>}
        </div>
      )}

      {contestStart > Date.now() && (
        <div className={"pt-5 pb-5 text-center"}>
          <p className={"h1"}>Starts in: </p>
          <Countdown date={contest.start_time} className="h1" />
        </div>
      )}
    </div>
  );
};
export default Contest;
