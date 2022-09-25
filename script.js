let bundeslaender = [];
let letters = [];


async function init() {
    response = await fetch('./bundeslaender.JSON');
    bundeslaender = await response.json();                   //fetch lädt mir das als Text runter, deswegen muss es mit json() in ein JSON Format umgewandelt werden
    render();
    fillArrayLetters();

}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < bundeslaender.length; i++) {
        let bundesland = bundeslaender[i]['name'];
        let population = bundeslaender[i]['population'];
        let link = bundeslaender[i]['url'];
        content.innerHTML += /*html*/`
            <div class="bundeslandBox">
                <a href="${link}">  
                    <div>
                        ${bundesland}
                    </div>
                    <div class="population">
                        ${population} Millionen
                    </div>
                </a>
            </div>
            `

    }
}

function fillArrayLetters() {
    for (let i = 0; i < bundeslaender.length; i++) {
        let bundesland = bundeslaender[i]['name'];
        let firstLetter = bundesland.charAt(0);
        if (letters.includes(firstLetter) == false) {
            letters.push(firstLetter);
        }
    }
    renderFilter();
}

function renderFilter() {
    for (let j = 0; j < letters.length; j++) {
        let letter = letters[j];

        let filter = document.getElementById('filter');
        filter.innerHTML += /*html*/`
            <div onclick="filter(${j})" class="letter" id="letter${j}">${letter}</div>`
    }
}

function filter(j) {
    let filterLetter = document.getElementById(`letter${j}`).innerHTML;
    content.innerHTML = '';
    for (let i = 0; i < bundeslaender.length; i++) {
        let bundesland = bundeslaender[i]['name'];
        let firstLetterOfBundesland = bundesland.charAt(0);
        if (filterLetter == firstLetterOfBundesland) {
            renderWithFilter(i);
        }
    }
}

function renderWithFilter(i) {
    let content = document.getElementById('content');
    let bundesland = bundeslaender[i]['name'];
    let population = bundeslaender[i]['population'];
    let link = bundeslaender[i]['url'];
    content.innerHTML += /*html*/`
            <div class="bundeslandBox">
                <a href="${link}">  
                    <div>
                        ${bundesland}
                    </div>
                    <div class="population">
                        ${population} Millionen
                    </div>
                </a>
            </div>
            `

}
