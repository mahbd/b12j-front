import React from "react";
import { Route, Switch } from "react-router-dom";
import { urls } from "../../configuration";
import Home from "./home";
import ContestForm from "./ContestForm";

const RestrictedRouter = () => {
   return (
      <Switch>
         <Route path={`${urls.addEditContest}/:contestId`} component={ContestForm} />
         <Route path={urls.addEditContest} component={ContestForm} />
         <Route path={urls.restricted} component={Home} />
      </Switch>
   );
};

export default RestrictedRouter;
