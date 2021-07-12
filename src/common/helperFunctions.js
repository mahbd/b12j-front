export function copyToClipBoard(text) {
  var input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  alert("Copied the text: " + text);
}

export const renderCol2 = (ele1, ele2) => {
  return <div className={"row"}>
    <div className="col-sm">{ele1}</div>
    <div className="col-sm">{ele2}</div></div>
}
