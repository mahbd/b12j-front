import React, { useContext } from "react";
import { SuperContext } from "../../context";
import { Table } from "../../components/customTags";

const TestCaseList = ({ match }) => {
  const { problemId } = match.params;
  const { problemActs } = useContext(SuperContext);
  const problem = problemActs.getById(problemId);
  const data = [];
  if (problem) {
    for (let test of problem.test_cases) {
      data.push([<pre>{test.inputs}</pre>, <pre>{test.output}</pre>]);
    }
  }
  return (
    problem && <div>
      <Table headers={["Input", "Output"]} body={data} />;
    </div>
  );
};

export default TestCaseList;