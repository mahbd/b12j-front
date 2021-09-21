import React, { useContext } from "react";
import { SuperContext } from "../../context";
import { Link } from "react-router-dom";
import { Table, Verdict } from "../../common/customTags";
import { urls } from "../../configuration";

const Submission = ({ match }) => {
   const { submissionId } = match.params;
   const { submissionActs, userActs, problemActs } = useContext(SuperContext);
   const submission = submissionActs.getById(submissionId);

   return (
      submission && (
         <div className="container mt-2">
            <Table
               headers={["ID", "Problem", "Submitter", "Language", "Verdict"]}
               body={[
                  [
                     submissionId,
                     <Link to={`${urls.problems}/${submission.problem}`}>
                        {problemActs.getById(submission.problem, "title")}
                     </Link>,
                     userActs.fullName(submission.by),
                     submission.language,
                     <Verdict verdict={submission.verdict} />,
                  ],
               ]}
            />
         </div>
      )
   );
};

export default Submission;
