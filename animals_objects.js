"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];
const Animal = {
    name: "",
    type: "",
    desc: "",
    age: 0
};

function start( ) {
    console.log("ready");

    loadJSON();
}


function loadJSON() {
    fetch("animals.json")
    .then( response => response.json() )
    .then( jsonData => {
        // when loaded, prepare objects
        prepareObjects( jsonData );
    });
}

function prepareObjects(jsonData) {
    
    jsonData.forEach( jsonObject => {
        // TODO: Create new object with cleaned data - and store that in the allAnimals array
        // splitting json description into array
        const animalArray = jsonObject.fullname.split(" ");

        //creating prototype and setting values
        const animal = Object.create(Animal);
    
        animal.name = animalArray[0];
        animal.type = animalArray[3];
        animal.desc = animalArray[2];
        animal.age = jsonObject.age;

        //adding the prototype to existing array
        allAnimals.push(animal);
    });

    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allAnimals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    console.log(animal);
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


