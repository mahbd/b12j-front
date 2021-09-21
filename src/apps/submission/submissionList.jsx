import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SuperContext } from "../../context";
import { pagination } from "../../common/helperFunctions";
import { Table, Verdict } from "../../common/customTags";

const SubmissionList = ({ match }) => {
   const page = parseInt(match.params.page) || 1;
   const { submissionActs, userActs } = useContext(SuperContext);
   const submissionList = submissionActs.getList(page);

   const pages = submissionActs.totalPages();

   return (
      <div className="container pt-2">
         {renderSubmissionList(submissionList, userActs)}
         {pagination("/submissions/page=", pages, page)}
      </div>
   );
};

export default SubmissionList;

export const renderSubmissionList = (submissionList, userActs) => {
   const data = [];
   for (let submission of submissionList) {
      data.push([
         userActs.fullName(submission.by),
         submission.problem_title,
         <Link to={`/submissions/${submission.id}`}><Verdict verdict={submission.verdict} /></Link>,
      ]);
   }
   return <Table headers={["By", "Problem", "Verdict"]} body={data} />;
};
