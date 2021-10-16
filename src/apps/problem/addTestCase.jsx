import React, { useContext } from "react";
import { SuperContext } from "../../context";
import { getCurrentUser } from "../../components/authService";
import { urls } from "../../configuration";

const AddTestCase = ({ match }) => {
  const { problemId } = match.params;
  const { problemActs } = useContext(SuperContext);
  const problem = problemActs.getById(problemId);

  if (!getCurrentUser()) {
    history.push(urls.login);
  }

  return (
    problem && <div>

    </div>
  );
};

export default AddTestCase;