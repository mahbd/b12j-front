import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import { SuperContext } from "../context";

const LoadingAnimation = () => {
   const { userActs } = useContext(SuperContext);
   const state = userActs.store.getState();

   const isLoading =
      state.problems.loading || state.users.loading || state.contests.loading || state.submissions.loading;
   return (
      isLoading && (
         <div className={"loader-back"}>
            <div className={"loader-center"}>
               <Loader type="BallTriangle" color="#00BFFF" height={"20%"} width={"20%"} />
            </div>
         </div>
      )
   );
};

export default LoadingAnimation;
