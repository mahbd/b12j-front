import React from "react";
import { getCurrentUser } from "../../components/authService";
import { useHistory } from "react-router-dom";
import { urls } from "../../configuration";

const Profile = () => {
   const currentUser = getCurrentUser()
   const history = useHistory()
   if (!currentUser) {
      history.replace(urls.login);
   }
   return (
      <div>
         <h1>Welcome {currentUser.name}</h1>
      </div>
   );
};

export default Profile;
