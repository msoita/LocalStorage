import { searchResults } from "./search.js";
const trailWrapper = document.getElementById("trailWrapper");
const categorySort = document.getElementById("categorySort");
const savedTrailsP = document.getElementById("savedTrails");

export const renderTrail = ()=>{
    const savedTrails = JSON.parse(localStorage.getItem("savedTrails"));
    const selectedGenre = categorySort.value;
    let sortedTrails = searchResults;

    savedTrailsP.hidden = true;
    if (selectedGenre === "saved"){
        sortedTrails = sortedTrails.filter((trail) =>{
            return savedTrails.includes(trail.name);
        })
        
        savedTrailsP.hidden = false;
        savedTrailsP.innerText = (sortedTrails.length > 0) ? 
            "Saved: " + sortedTrails.length : "No saved trails yet";
    }

    trailWrapper.innerHTML = "";
    sortedTrails.forEach((trail, i) =>{
        const container = document.createElement("div");
        const header = document.createElement("h3");
        const info = document.createElement("p");
        const save = document.createElement("button")
        const remove = document.createElement("button");
        const noSpaces = trail.name.replaceAll(" ", "");

        container.id = noSpaces;        
        header.innerText = trail.name;
        info.innerText = trail.park + "\nMiles: " + trail.miles + 
            "\nDifficulty: " + trail.difficulty; 

        save.id = "save";
        save.innerText = (savedTrails.includes(trail.name)) ? "★ Saved" : "☆ Save";
        save.addEventListener("click", ()=> toggleSaved(trail.name));

        remove.hidden = true;
        remove.innerText = "×";

        if (selectedGenre === "saved"){
            save.hidden = true;
            remove.hidden = false;

            remove.addEventListener("click", ()=> {
                const savedTrails = JSON.parse(localStorage.getItem("savedTrails"));
                if (savedTrails.includes(trail.name)){
                    savedTrails.splice(savedTrails.indexOf(trail.name), 1);
                    localStorage.setItem("savedTrails", JSON.stringify(savedTrails));

                    renderTrail();
                }
            })
        }

        container.appendChild(header);
        container.appendChild(info);
        container.appendChild(save);
        container.appendChild(remove);
        trailWrapper.appendChild(container);
    })
}

const toggleSaved = (trailName)=>{
    const noSpaces = trailName.replaceAll(" ", "");
    const savedTrails = JSON.parse(localStorage.getItem("savedTrails"));
    const container = document.querySelector(`#${noSpaces}`);
    const saveButton = container.querySelector('#save');

    if (savedTrails.includes(trailName)){
        savedTrails.splice(savedTrails.indexOf(trailName), 1);
    }else{
        savedTrails.push(trailName);
    }

    saveButton.innerText = (savedTrails.includes(trailName)) ? "★ Saved" : "☆ Save";
    localStorage.setItem("savedTrails", JSON.stringify(savedTrails));
}
categorySort.addEventListener("change", renderTrail);