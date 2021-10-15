import React from "react";
import { Route, Switch } from "react-router-dom";
import { urls } from "../../configuration";
import Home from "./home";

const RestrictedRouter = () => {
   return (
      <Switch>
         <Route path={urls.restricted} component={Home} />
      </Switch>
   );
};

export default RestrictedRouter;
