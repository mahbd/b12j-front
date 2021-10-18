import React, { useContext, useEffect, useState } from "react";
import { SuperContext } from "../../context";
import { Link } from "react-router-dom";
import { Table, Verdict } from "../../components/customTags";
import { apiEndpoint, serverUrls, urls } from "../../configuration";
import httpService from "../../components/httpService";

const Submission = ({ match }) => {
  const { submissionId } = match.params;
  const { userActs, problemActs } = useContext(SuperContext);
  const [submission, setSubmission] = useState(undefined);

  useEffect(() => {
    httpService.get(`${apiEndpoint}${serverUrls.submissions}/${submissionId}`).then(res => {
      setSubmission(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, [submissionId]);

  return (
    <div>{submission &&
    <div className="container mt-2">
      <Table
        headers={["ID", "Problem", "Submitter", "Language", "Verdict"]}
        body={[
          [
            submissionId,
            <Link to={`${urls.problems}/${submission.problem}`}>
              {problemActs.getById(submission.problem, "title")}
            </Link>,
            userActs.fullName(submission.user),
            submission.language,
            <Verdict verdict={submission.verdict} />
          ]
        ]}
      />
      {renderSubmissionDetails(submission.details, submission.code)}
    </div>}
    </div>
  );
};

export default Submission;


const renderSubmissionDetails = (details, code) => {
  if (details) {
    try {
      details = JSON.parse(details);
    } catch (e) {
      return <h3>Submission details is not available</h3>;
    }

    if (details[2] === "CE") {
      return <div>
        <h1>{details[0]}</h1>
        {code && <pre className={"bg-success text-white"}>{code}</pre>}
        <pre className={"h6"}>{details[1]}</pre>
      </div>;
    } else if (details[2] === "WA" || details[2] === "AC") {
      console.log(details[1]);
      return <div>
        <h1>{details[0]}</h1>
        {code && <pre className={"bg-success text-white"}>{code}</pre>}
        <Table headers={["Input", "Your Output", "Correct Output"]}
               body={details[1]}
        />
      </div>;
    }
  }
};
