import React, { useContext } from "react";
import { SuperContext } from "../../context";
import TutorialForm from "../../components/forms/tutorialForm";

const AddEditTutorial = ({ history, match }) => {
  const { id } = match.params;
  const { contestActs, problemActs, tutorialActs } = useContext(SuperContext);
  const tutorial = tutorialActs.getById(id);
  const problems = problemActs.getAllList();
  const contests = contestActs.getAllList();
  return (
    <div>
      {!tutorial && <div>
        <h1>Add new contest</h1>
        <TutorialForm contests={contests} problems={problems} history={history} />
      </div>}
      {tutorial &&
      <div>
        <h1>{tutorial.title}</h1>
        <TutorialForm contests={contests} problems={problems} history={history} tutorial={tutorial} />
      </div>}
    </div>
  );
};

export default AddEditTutorial;