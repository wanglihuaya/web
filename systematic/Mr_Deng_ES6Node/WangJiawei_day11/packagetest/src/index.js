import first from "./first.js";
import comm from "./common.js";
import "./style.css";
import "./demo.scss";

let a = 10;
const fn = () => {
  console.log("Home init");
  console.log(comm);
  console.log(first);
  first.fn();
};

$("#box").css("border", "10px solid white");
console.log($("#box"));

fn();
