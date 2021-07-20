import React, { useContext } from "react";
import ProblemCode from "../../common/problemCode";
import { Link } from "react-router-dom";
import { SuperContext } from "../../context";
import { urls } from "../../configuration";
import { FormattedHtml } from "../../common/helperFunctions";
import { getCurrentUser } from "../../common/authService";
import { Table } from "../../common/customTags";

const Problem = ({ match }) => {
   const { problemActs, userActs } = useContext(SuperContext);
   const { problemId } = match.params;
   const problem = problemActs.getById(problemId);

   const userId = getCurrentUser() && getCurrentUser().id;
   return (
      problem && (
         <div className="container">
            {userId && problem.by === userId && (
               <div>
                  <Link to={`${urls.editProblem}/${problemId}`} className={"btn btn-warning"}>
                     Edit
                  </Link>
               </div>
            )}

            <div className="float-end">
               <a className={"white-link"} href={"#codeEditor"}>
                  Code Editor
               </a>
            </div>
            <div className={"text-center pt-5"}>
               <h1 className={"display-4 fw-bold text-secondary rounded-3"}>{problem.title}</h1>
               <p> Writer: {userActs.fullName(problem.by)} </p>
               <p>Time Limit: {problem.memory_limit} MB</p>
               <p>Memory Limit: {problem.time_limit} second(s)</p>
            </div>

            <div>
               {problem.notice && <div className={"alert alert-secondary"}>{problem.notice}</div>}
               <b className={"h5"}>Problem statement</b>
               <FormattedHtml text={problem.text} /> <br />
               <b className={"h5"}>Input Terms</b>
               <FormattedHtml text={problem.inTerms} /> <br />
               <b className={"h5"}>Output Terms</b>
               <FormattedHtml text={problem.outTerms} /> <br />
            </div>
            <TestCases test_cases={problem.test_cases} />
            <ProblemCode problem={problem} />
         </div>
      )
   );
};

export default Problem;

const TestCases = ({ test_cases }) => {
   const data = [];
   for (let test of test_cases) {
      data.push([<pre>{test.input}</pre>, <pre>{test.output}</pre>]);
   }
   return <Table headers={["Input", "Output"]} body={data} />;
};
