import { renderTrail } from "./page/trail.js";
if (!localStorage.getItem("savedTrails")){
  localStorage.setItem("savedTrails", "[]");
}
renderTrail();