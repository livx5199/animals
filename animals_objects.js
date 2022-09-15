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
    age: 0,
    star: false
};

const settings = {
    filter: "all",
    sortBy: "name",
    sortDir: "asc"
}



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
    
    setFilter(filter);
}

function setFilter(filter) {
    settings.filterBy = filter;
    
    buildList();
}

function filtering(filteredList) {
    // let filteredList = allAnimals;

    if (settings.filterBy === "cat") {
        filteredList = allAnimals.filter(isCat);
    } else if (settings.filterBy === "dog") {
        filteredList = allAnimals.filter(isDog);
    } else {
        filteredList = allAnimals;
}
    return filteredList;
}

function buildList() {
    const currentList = filtering(allAnimals);
    const sortedList = sortList(currentList);

    displayList(sortedList);
    console.log(currentList);
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

function selectSort(event) {
    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    //find old sortBy element
    const oldElement = document.querySelector(`[data-sort='${settings.sortBy}']`);
    oldElement.classList.remove("sortby");

    //indicate active sort
    event.target.classList.add("sortby");

    //toggle direction
    if (sortDir === "asc") {
        event.target.dataset.sortDirection = "desc";
    } else {
        event.target.dataset.sortDirection = "asc";
    }
    console.log("user selected", sortBy);
    setSort(sortBy, sortDir);

}
function setSort(sortBy, sortDir) {
    settings.sortBy = sortBy;
    settings.sortDir = sortDir;
    buildList();
}

function sortList(sortedList) { 
    let direction = 1;
    if (settings.sortDir === "desc") {
        direction = -1;
    } else {
        settings.direction = 1;
    }
sortedList = sortedList.sort(sortByProperty);

    function sortByProperty(animalA, animalB) {
        if (animalA[settings.sortBy] < animalB[settings.sortBy]) {
            return -1 * direction;
        } else {
            return 1 * direction;
        }
    }    
    return sortedList;
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

    buildList();
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

    if (animal.star === true) {
        clone.querySelector("[data-field=star]").textContent = "⭐"
    } else {
        clone.querySelector("[data-field=star]").textContent = "☆"
    }

    clone.querySelector("[data-field=star]").addEventListener("click", clickStar);
    
    function clickStar() {
    if (animal.star === true) {
        animal.star = false;
    } else {
        animal.star = true;
    }

    buildList();
}
    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}




