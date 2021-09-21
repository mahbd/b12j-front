import React, { useContext, useState } from "react";
import { SuperContext } from "../../context";
import { Table } from "../../common/customTags";

const UserList = () => {
   const { userActs } = useContext(SuperContext);
   const [users] = useState(userActs.getList());

   const data = [];
   for (let user of users) {
      data.push([user.id, user.first_name, user.last_name])
   }

   return (
      <div className="container">
         <Table headers={["User id", "First Name", "Last Name"]} body={data} />
      </div>
   );
};

export default UserList;

export const UserListSingleRow = ({ users, userActs }) => {
   return users.map((userId) => (
      <p className="user" key={userId}>
         {userActs.fullName(userId)}
      </p>
   ));
};
