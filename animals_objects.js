"use strict";

window.addEventListener("DOMContentLoaded", start);

// const catButton = document.querySelector(".catsbutton");
// const dogButton = document.querySelector(".dogsbutton");
// const allButton = document.querySelector(".allbutton");

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
    registerButtons();

}

function registerButtons() {
    document.querySelectorAll("[data-action='filter']")
        .forEach(button => button.addEventListener("click", selectFilter));
    
        document.querySelectorAll("[data-action='sort']")
        .forEach(button => button.addEventListener("click", selectSort));
}

function selectFilter(event) {
    const filter = event.target.dataset.filter;
    console.log("user selected", filter);
    filtering(filter);
}

function selectSort(event) {
    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    //toggle direction
    if (sortDir === "asc") {
        event.target.dataset.sortDirection = "desc";
    } else {
        event.target.dataset.sortDirection = "asc";
    }
    console.log("user selected", sortBy);
    sortList(sortBy, sortDir);
}

function filtering(animalType) {
    let filteredList = allAnimals;

    if (animalType === "cat") {
        filteredList = allAnimals.filter(isCat);
        console.log(filteredList);
    } else if (animalType === "dog") {
        filteredList = allAnimals.filter(isDog);
        console.log(filteredList);
    } else {
        filteredList = allAnimals;
}
    
    displayList(filteredList);
}

function isCat(animal) {
    // if (animal.type == "cat") {
    //     return true;
    // }
    // return false;
 
    return animal.type === "cat";
}

function isDog(animal) {
    return animal.type === "dog";
}

function sortList(sortBy, sortDir) {
    let sortedList = allAnimals;
    let direction = 1;
    if (sortDir === "desc") {
        direction = -1;
    } else {
        direction = 1;
    }
    sortedList = sortedList.sort(sortByProperty);

    function sortByProperty(animalA, animalB) {
        if (animalA[sortBy] < animalB[sortBy]) {
            return -1 * direction;
        } else {
            return 1 * direction;
        }
    }    
    displayList(sortedList);
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
    filtering();
}

function displayList(filter) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    filter.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // console.log(animal);
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


