import React from "react";
import { Switch, Route } from "react-router-dom";
import { urls } from "../../configuration";
import ContestList from "./contestList";
import Contest from "./contest";
import Standing from "./standing";

const ContestRoute = () => {
   return (
      <Switch>
         <Route path={`${urls.standing}/:contestId`} component={Standing} />
         <Route path={`${urls.contests}/:contestId`} component={Contest} />
         <Route path={urls.contests} component={ContestList} />
      </Switch>
   );
};

export default ContestRoute;
