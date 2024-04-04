'use strict'

const login = document.querySelector("#login");
const about = document.querySelector("#about");
const favourites = document.querySelector("#favourites");
const loginModal = document.createElement("dialog");
const aboutModal = document.createElement("dialog");
const favouritesModal = document.createElement("dialog");
document.querySelector("body").appendChild(loginModal);
document.querySelector("body").appendChild(aboutModal);
document.querySelector("body").appendChild(favouritesModal);



/*LOGIN LOGIC*/
/*Creation of elements1*/
const loginForm = document.createElement("form");

//Avatar
const imgContainer = document.createElement("div"); //imgContainer.classList.add()
const avatar = document.createElement("img");
avatar.src = "../images/logo_q.png";
avatar.classList.add("login_png");
avatar.alt = "User image";
avatar.style.display = "block";
imgContainer.appendChild(avatar);


//Container of Login and Password
const lUname=document.createElement("label");
lUname.htmlFor = "uname";
lUname.style.display = "block";
lUname.style.marginBottom = "0.3rem";
lUname.innerHTML = "<b>Username</b>"


const inputUname = document.createElement("input");
inputUname.type = "username";
inputUname.classList.add("input");
inputUname.placeholder = "Enter Username";
inputUname.style.display = "block";
inputUname.style.width = "50%";
inputUname.style.margin = "auto";
inputUname.name = "uname";
inputUname.required = true;


const lPsw= document.createElement("label");
lPsw.htmlFor = "psw";
lPsw.style.display = "block";
lPsw.style.marginBottom = "0.3rem";
lPsw.innerHTML = "<b>Password</b>"

const inputPsw = document.createElement("input");
inputPsw.type = "password";
inputPsw.classList.add("input");
inputPsw.style.display = "block";
inputPsw.style.width = "50%";
inputPsw.style.margin = "auto";
inputPsw.placeholder = "Enter Password";
inputPsw.name = "psw";
inputPsw.required = true;

const buttonSubmit = document.createElement("button");
buttonSubmit.type = "submit";
buttonSubmit.classList.add("submit_button");
buttonSubmit.style.display = "block";
buttonSubmit.style.width = "50%";
buttonSubmit.style.margin = "auto";
buttonSubmit.innerHTML = "Login";

const lRemember = document.createElement("label");
lRemember.style.fontSize = "12px";
const inputRemember = document.createElement("input");
inputRemember.type = "checkbox";
inputRemember.checked = true;
inputRemember.name = "remember";
lRemember.append(document.createElement("p").innerHTML = "Remember me");
lRemember.append(inputRemember);





loginForm.append(avatar, document.createElement("br"), lUname, inputUname,
    document.createElement("br"), lPsw, inputPsw,
    document.createElement("br"), buttonSubmit, lRemember);
loginModal.append(loginForm);


// Login Logic ends--------------------------------------------------------------------------------------------------------













// Listeners --------------------------------------------------------
login.addEventListener('click', evt => {
    evt.preventDefault();
    console.log("Clicked")
    loginModal.showModal()
})

about.addEventListener('click', evt => {
    evt.preventDefault();
    console.log("Clicked")
    aboutModal.showModal()
})

favourites.addEventListener('click', evt => {
    evt.preventDefault();
    console.log("Clicked")
    favouritesModal.showModal()
})
































//----------fetch---API-------------------------
async function fetchRestaurants() {
    try {
        const array = await makeFetch('https://10.120.32.94/restaurant/api/v1/restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return array;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
}

async function makeFetch(url, options) {
    const result = await fetch(url, options);
    const json = await result.json();
    return json;
}

//------My Location---------
let myLocation = [];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition);
} else {
    console.log('Geolocation is not supported in this browser');
}

async function handlePosition(position) {
    myLocation = [position.coords.latitude, position.coords.longitude];



    const map = L.map('map').setView(myLocation, 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 5,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const restaurants = await fetchRestaurants();
    for (const restourant of restaurants) {
        restourant.location.coordinates.reverse();
        const marker = L.marker(restourant.location.coordinates).addTo(map);
        marker.bindPopup(`<h3>${restourant.name}</h3><br><p>${restourant.address}</p>`);
    }

    // Define the icon configuration
    const myIcon = L.icon({
        iconUrl: '../images/whereIAm.gif',
        iconSize: [32, 32], // Adjust the size as needed
        iconAnchor: [16, 16] // Adjust the anchor point as needed
    });

    // Create the marker with the specified icon
    const marker = L.marker(myLocation, { icon: myIcon }).addTo(map);
    marker.bindPopup(`<h3>I am here</h3>`).openPopup();
}
