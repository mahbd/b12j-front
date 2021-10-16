import React, { useContext } from "react";
import { SuperContext } from "../../context";

const AddTestCase = ({ histoy, match }) => {
  const { problemId } = match.params;
  const { problemActs } = useContext(SuperContext);
  const problem = problemActs.getById(problemId);
  return (
    problem && <div>

    </div>
  );
};

export default AddTestCase;