import React from "react";
import { Switch, Route } from "react-router-dom";
import ProblemList from "./problemList";
import { urls } from "../../configuration";
import Problem from "./problem";
import AddEditProblem from "./addEditProblem";

const ProblemRoute = () => {
   return (
      <Switch>
         <Route path={`${urls.problems}/page=:page`} component={ProblemList} />
         <Route path={`${urls.addProblem}`} component={AddEditProblem} />
         <Route path={`${urls.editProblem}/:id`} component={AddEditProblem} />
         <Route path={`${urls.problems}/:problemId`} component={Problem} />
         <Route path={urls.problems} component={ProblemList} />
      </Switch>
   );
};

export default ProblemRoute;
