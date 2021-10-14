import React from "react";

const LoadingAnimation = () => {
  return <div id={"loading-animation"} className={"loader-container"}>
    <div className="loader" />
    <p id={"loading-text"} className={"text-success h3 loader-text text-center"} />
  </div>;
};

export const startLoading = (text = "") => {
  const loading = document.getElementById("loading-animation");
  const t = document.getElementById("loading-text");
  loading.style.display = "block";
  t.innerText = text;
};

export const stopLoading = () => {
  const loading = document.getElementById("loading-animation");
  const t = document.getElementById("loading-text");
  loading.style.display = "none";
  t.innerText = "";
};

export default LoadingAnimation;
