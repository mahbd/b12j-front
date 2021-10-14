import "./index.css";
import React, { useContext, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { urls } from "./configuration";
import UserRoute from "./apps/user/userRoute";

import { SuperContext } from "./context";
import Home from "./apps/home";
import Footer from "./apps/footer";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const { userActs } = useContext(SuperContext);

  let unSub = userActs.store.subscribe(() => {
    setTimeout(() => {
      setRefresh(!refresh);
      unSub();
    }, 100);
  });

  return (
    <div>
      {/*<NavBar />*/}
      <Switch>
        <Route path={urls.home} component={Home} />
        <div className={"row"}>
          <div className={"col-2"}>
            {/*<LeftSideBar />*/}
          </div>
          <div className={"col-10"}>
            <Switch>
              {/*<Route path={urls.contests} component={ContestRoute} />*/}
              {/*<Route path={urls.problems} component={ProblemRoute} />*/}
              {/*<Route path={urls.restricted} component={RestrictedRouter} />*/}
              {/*<Route path={urls.submissions} component={SubmissionRoute} />*/}
              {/*<Route path={urls.tutorials} component={TutorialRoute} />*/}
              <Route path={urls.users} component={UserRoute} />
            </Switch>
          </div>
          {/*<div className={"col-auto"}>*/}
          {/*   <RightSideBar />*/}
          {/*</div>*/}
        </div>
      </Switch>
      <Route exact path={"/"}>
        <Redirect exact from={"/"} to={"/home"} />
      </Route>
      <Footer />
    </div>
  );
};

export default App;
