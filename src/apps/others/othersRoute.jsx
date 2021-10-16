import React from "react";
import { Route, Switch } from "react-router-dom";
import { urls } from "../../configuration";
import EmailSent from "./emailSent";


const OthersRoute = () => {
   return (
      <Switch>
         <Route path={urls.emailSent} component={EmailSent} />
      </Switch>
   );
};

export default OthersRoute;
