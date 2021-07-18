import "./app.css"
import React, {useContext, useState} from 'react';
import NavBar from "./apps/navBar";
import {Route, Switch, Redirect} from "react-router-dom";
import {urls} from "./configuration";
import ContestRoute from "./apps/contest/contestRoute";
import UserRoute from "./apps/user/userRoute";
import ProblemRoute from "./apps/problem/problemRoute";
import LoadingAnimation from "./common/loadingAnimation";

import SubmissionRoute from "./apps/submission/submissionRoute";
import TutorialRoute from "./apps/tutorial/tutorialRoute";
import {SuperContext} from "./context";
import LeftSideBar from "./apps/leftSideBar";
import RightSideBar from "./apps/rightSideBar";
import Home from "./apps/home";
import Footer from "./apps/footer";
import RestrictedRouter from "./apps/restricted/restrictedRouter";


const App = () => {
  const [refresh, setRefresh] = useState(false);
  const {userActs} = useContext(SuperContext);

  let unSub = userActs.store.subscribe(() => {
    setTimeout(() => {
      setRefresh(!refresh);
      unSub();
    }, 100)
  })

  return (
    <div>
      <LoadingAnimation/>
      <NavBar/>
      <Switch>
        <Route path={urls.home} component={Home}/>
        <div className={"row"}>
          <div className={"col-auto"}>
            <LeftSideBar/>
          </div>
          <div className={"col"}>
            <Switch>
              <Route path={urls.contests} component={ContestRoute}/>
              <Route path={urls.problems} component={ProblemRoute}/>
              <Route path={urls.restricted} component={RestrictedRouter}/>
              <Route path={urls.submissions} component={SubmissionRoute}/>
              <Route path={urls.tutorials} component={TutorialRoute}/>
              <Route path={urls.users} component={UserRoute}/>
            </Switch>
          </div>
          <div className={"col-auto"}>
            <RightSideBar/>
          </div>
        </div>
      </Switch>
      <Route exact path={"/"}>
        <Redirect exact from={"/"} to={"/home"}/>
      </Route>
      <Footer/>
    </div>

  );
};

export default App;
