import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SuperContext } from "../../context";
import { urls } from "../../configuration";
import { pagination } from "../../common/helperFunctions";
import { Table } from "../../common/customTags";

const TutorialList = ({ match }) => {
   const page = parseInt(match.params.page) || 1;
   const { tutorialActs, userActs } = useContext(SuperContext);
   const tutorials = tutorialActs.getList(page);
   const pages = tutorialActs.totalPages();

   return (
      <div className="container">
         {renderTutorialList(tutorials, userActs)}
         {pagination(`${urls.tutorials}/page=`, pages, page)}
      </div>
   );
};

export default TutorialList;

export const renderTutorialList = (tutorials, userActs) => {
   const data = [];
   for (let tutorial of tutorials) {
      data.push([
         <Link to={`${urls.tutorials}/${tutorial.id}`}>{tutorial.title}</Link>,
         userActs.fullName(tutorial.by),
      ]);
   }
   return <Table headers={["Name", "Writer"]} body={data} />;
};
