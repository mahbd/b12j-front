import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {SuperContext} from "../../context";
import {pagination} from "../../common/helperFunctions";

const SubmissionList = ({match}) => {
    const page = parseInt(match.params.page) || 1;
    const {submissionActs, userActs} = useContext(SuperContext);
    const submissionList = submissionActs.getList(page);

    const pages = submissionActs.totalPages();

    return (
        <div className="container pt-2">
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th className={"bg-dark rounded-3 text-white"}>Id</th>
                    <th className={"bg-dark rounded-3 text-white"}>By</th>
                    <th className={"bg-dark rounded-3 text-white"}>Problem</th>
                    <th className={"bg-dark rounded-3 text-white"}>Verdict</th>
                </tr>
                </thead>
                <tbody>
                {submissionList.map((submission) => <tr key={submission.id}>
                    <td><Link to={`/submissions/${submission.id}`}>{submission.id}</Link></td>
                    <td>{userActs.fullName(submission.by)}</td>
                    <td>{submission.problem_title}</td>
                    <td>{submission.verdict}</td></tr>)}
                </tbody>
            </table>
            {pagination('/submissions/page=', pages, page)}
        </div>
    );
};

export default SubmissionList;
