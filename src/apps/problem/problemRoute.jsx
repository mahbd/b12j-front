import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProblemList from "./problemList";
import Problem from "./problem";
import ProblemForm from "./problemForm";
import {urls} from "../../configuration";

const ProblemRoute = () => {
  return (
    <Switch>
      <Route path={`${urls.problems}/contestId=:contestId`} component={ProblemList}/>
      <Route path={`${urls.problems}/page=:page`} component={ProblemList}/>
      <Route path={`${urls.addProblem}`} component={ProblemForm}/>
      <Route path={`${urls.editProblem}/:problemId`} component={ProblemForm}/>
      <Route path={`${urls.problems}/:problemId`} component={Problem}/>
      <Route path={urls.problems} component={ProblemList}/>
    </Switch>
  );
};

export default ProblemRoute;