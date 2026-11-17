const inputTache = document.getElementById("nouvelle-tache");
const boutonAjouter = document.getElementById("ajouter-btn");
const listeTaches = document.getElementById("liste-taches");


function sauvegarderTaches() {
    const taches = [];
    const elementsLi = listeTaches.querySelectorAll("li");

    elementsLi.forEach((li) => {
        const label = li.querySelector("label");
        const checkbox = li.querySelector("input[type='checkbox']");

        taches.push({
            texte: label.textContent,
            cochee: checkbox.checked
        });
    });

    localStorage.setItem("mesTaches", JSON.stringify(taches));
}


function creerElementTache(texte, estCochee = false) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    checkbox.type = "checkbox";
    checkbox.checked = estCochee;
    label.textContent = texte;

    checkbox.addEventListener("change", sauvegarderTaches);

    li.appendChild(checkbox);
    li.appendChild(label);
    listeTaches.appendChild(li);
}


function ajouterTache() {
    const texte = inputTache.value.trim();

    if (texte === "") {
        alert("Champs obligatoire.");
        return;
    }

    creerElementTache(texte, false);
    sauvegarderTaches(); 

    inputTache.value = "";
    inputTache.focus();
}
    

function chargerTaches() {
    const donneesSauvegardees = localStorage.getItem("mesTaches");
    
    if (donneesSauvegardees) {
        const taches = JSON.parse(donneesSauvegardees);
        taches.forEach((tache) => {
            creerElementTache(tache.texte, tache.cochee);
        });
    }
}

boutonAjouter.addEventListener("click", ajouterTache);

inputTache.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        ajouterTache();
    }
});


chargerTaches();
