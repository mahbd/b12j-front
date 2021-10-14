import React from "react";

const LoadingAnimation = () => {
  return <div id={"loading-animation"} className={"loader-container"}>
    <div className="loader" />
    <p id={"loading-text"} className={"text-success h3 loader-text text-center"} />
  </div>;
};

export const startLoading = (text = null) => {
  const loading = document.getElementById("loading-animation");
  if (text) {
    const t = document.getElementById("loading-text");
    t.innerText = text;
  }
  loading.style.display = "block";
};

export const stopLoading = () => {
  const loading = document.getElementById("loading-animation");
  const t = document.getElementById("loading-text");
  loading.style.display = "none";
  t.innerText = "";
};

export default LoadingAnimation;
