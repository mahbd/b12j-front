import React from 'react';

import {Fade, Zoom, Slide} from "react-awesome-reveal";
import {getCurrentUser} from "../common/authService";

const Home = () => {
  const user = getCurrentUser();
  return (
    <div>
      <Fade duration={1000}>
        <div style={{color: "#d03af2"}} className={"balloon full-height align-text-bottom fw-bolder display-6"}>
          {user && <Slide><p className={"full-opacity ps-5 text-end"}>Hey, {user.full_name}</p></Slide>}
        <div style={{height: "30%"}}/>
          <Slide direction={"right"}><p className={"text-center display-1 fw-bolder align-content-center"}>Welcome to B12J</p></Slide>
          <div style={{height: "20%"}}/>
          <Fade duration={5000}><p style={{color: "#0a1c8f"}} className={"text-center"}>Online judge for beginners</p></Fade>
        </div>
      </Fade>
      <Zoom>
        <img className={"full-height"}
          src="https://hackr.io/blog/what-is-coding-used-for/thumbnail/large"
          alt="Coding" width={"100%"}/>
      </Zoom>

    </div>
  );
};

export default Home;