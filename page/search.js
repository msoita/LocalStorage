import { renderTrail } from "./trail.js";
import { trails } from "../trails.js";

export let searchResults = trails;
const trailCategories = ["name", "park", "difficulty"];
const search = document.getElementById("search");

function convertString(str){
  return str.toLowerCase().replaceAll(" ", "");
}

search.addEventListener("input", () =>{
  const searchValue = convertString(search.value);
  searchResults = trails.filter(trail => {
    return convertString(trail.name).includes(searchValue);
  })

  trailCategories.forEach(category => {
    if (searchResults.length === 0){
        searchResults = trails.filter(trail => {
            return convertString(trail[category]).includes(searchValue);
        });
    }else{
        return;
    }
  });
  renderTrail();
})