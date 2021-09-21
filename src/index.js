import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { getJwt, logout } from "./common/authService";
import httpService from "./common/httpService";
import { endpoint, wssURL } from "./configuration";
import { SuperContext } from "./context";
import WebSocketReceive from "./store/webSocketReceive";
import App from "./app";
import storeFunc from "./store/configureStore";
import ReconnectingWebSocket from "reconnecting-websocket";
import { contestActions } from "./store/data/contests";
import { problemActions } from "./store/data/problems";
import { problemDiscussionActions } from "./store/data/problemDiscussion";
import { submissionActions } from "./store/data/submissions";
import { tutorialActions } from "./store/data/tutorials";
import { tutorialDiscussionActions } from "./store/data/tutorialDiscussion";
import { userActions } from "./store/data/users";
import { useEffect } from "react";

const generateData = () => {
   const store = storeFunc();
   const ws = new ReconnectingWebSocket(`${wssURL()}/`, "", {
      maxReconnectionDelay: 60000,
      minReconnectionDelay: 500,
   });

   const contestActs = new contestActions(store, ws);
   const problemActs = new problemActions(store, ws);
   const problemDiscussionActs = new problemDiscussionActions(store, ws);
   const submissionActs = new submissionActions(store, ws);
   const tutorialActs = new tutorialActions(store, ws);
   const tutorialDiscussionActs = new tutorialDiscussionActions(store, ws);
   const userActs = new userActions(store, ws);
   return {
      contestActs,
      problemActs,
      problemDiscussionActs,
      store,
      submissionActs,
      tutorialActs,
      tutorialDiscussionActs,
      userActs,
      ws,
   };
};

const ParentApp = () => {
   const data = generateData();
   useEffect(() => {
      if (getJwt()) {
         httpService.get(endpoint + "/users/login_check/").then(({ data }) => {
            if (!data.status) {
               console.log("Wrong credentials");
               logout();
            }
         });
      }
   }, []);
   return (
      <SuperContext.Provider value={data}>
         <div>
            <WebSocketReceive />
            <App />
         </div>
      </SuperContext.Provider>
   );
};

ReactDOM.render(
   <BrowserRouter>
      <ParentApp />
   </BrowserRouter>,
   document.getElementById("root")
);
