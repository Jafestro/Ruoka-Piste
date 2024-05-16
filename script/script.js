'use strict'

const login = document.querySelector("#login");
const about = document.querySelector("#about");
const profile = document.querySelector("#profile");
const loginModal = document.createElement("dialog");
const aboutModal = document.createElement("dialog");
const profileModal = document.createElement("dialog");
document.querySelector("body").appendChild(loginModal);
document.querySelector("body").appendChild(aboutModal);
document.querySelector("body").appendChild(profileModal);

let currentFavRestaurant = null;
let currentFavHeart = null;
let currentFavRestaurantMarker = null;
const restaurantHearts = new Map();
const restaurantMarkers = new Map();

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const defaultIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

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
const lUname = document.createElement("label");
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


const lPsw = document.createElement("label");
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

const noAccount = document.createElement("label");
noAccount.style.fontSize = "12px";
noAccount.style.display = "block";
noAccount.style.textAlign = "center";
noAccount.id = "noAccount";
noAccount.style.color = "red";
noAccount.innerHTML = "No Account?";

loginForm.append(avatar, document.createElement("br"), lUname, inputUname,
    document.createElement("br"), lPsw, inputPsw,
    document.createElement("br"), buttonSubmit, lRemember, noAccount);
loginModal.append(loginForm);

buttonSubmit.addEventListener('click', async (e) => {
    e.preventDefault();

    // Create a user object
    const user = {
        username: inputUname.value,
        password: inputPsw.value
    };

    // Send a POST request to the API
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Save the token and username to the session storage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('favouriteRestaurant', data.data.favouriteRestaurant);

        // Close the login dialog box
        loginModal.close();

        // Refresh the page
        location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
});


// Login Logic ends--------------------------------------------------------------------------------------------------------


// Register begins--------------------------------------------------------------------------------------------------------
noAccount.addEventListener('click', evt => {

    evt.preventDefault();

    // Create a new dialog box for registration
    const registerModal = document.createElement("dialog");
    document.querySelector("body").appendChild(registerModal);

    // Create a new form for registration
    const registerForm = document.createElement("form");

    // Add the avatar
    const avatarClone = avatar.cloneNode(true);
    registerForm.appendChild(avatarClone);
    registerForm.appendChild(document.createElement("br"));

    // Add the email field
    const lEmail = document.createElement("label");
    lEmail.htmlFor = "email";
    lEmail.style.display = "block";
    lEmail.style.marginBottom = "0.3rem";
    lEmail.innerHTML = "<b>Email</b>"

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.classList.add("input");
    inputEmail.placeholder = "Enter Email";
    inputEmail.style.display = "block";
    inputEmail.style.width = "50%";
    inputEmail.style.margin = "auto";
    inputEmail.name = "email";
    inputEmail.required = true;

    registerForm.appendChild(lEmail);
    registerForm.appendChild(inputEmail);
    registerForm.appendChild(document.createElement("br"));

    // Add the username and password fields
    const inputUname = document.createElement("input");
    inputUname.type = "username";
    inputUname.classList.add("input");
    inputUname.placeholder = "Enter Username";
    inputUname.style.display = "block";
    inputUname.style.width = "50%";
    inputUname.style.margin = "auto";
    inputUname.name = "uname";
    inputUname.required = true;

    const inputPsw = document.createElement("input");
    inputPsw.type = "password";
    inputPsw.classList.add("input");
    inputPsw.style.display = "block";
    inputPsw.style.width = "50%";
    inputPsw.style.margin = "auto";
    inputPsw.placeholder = "Enter Password";
    inputPsw.name = "psw";
    inputPsw.required = true;



    registerForm.appendChild(lUname.cloneNode(true));
    registerForm.appendChild(inputUname);
    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(lPsw.cloneNode(true));
    registerForm.appendChild(inputPsw);
    registerForm.appendChild(document.createElement("br"));

    // Add the "Register" button
    const registerButton = document.createElement("button");
    registerButton.type = "submit";
    registerButton.classList.add("submit_button");
    registerButton.style.display = "block";
    registerButton.style.width = "50%";
    registerButton.style.margin = "auto";
    registerButton.innerHTML = "Register";

    registerButton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Create a user object
        const user = {
            username: inputUname.value,
            password: inputPsw.value,
            email: inputEmail.value
        };

        // Send a POST request to the API
        try {
            const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Close the registration dialog box
            registerModal.close();

            // Create a pop-up window
            const popup = document.createElement("div");
            popup.textContent = "Registration successful!";
            popup.style.position = "fixed";
            popup.style.left = "50%";
            popup.style.top = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.padding = "1em";
            popup.style.backgroundColor = "lightgreen";
            popup.style.border = "1px solid green";
            popup.style.zIndex = "9999999"; // Add this line
            popup.style.color = "black"; // Add this line
            loginModal.appendChild(popup);

            // Remove the pop-up window after 1 second
            setTimeout(() => {
                loginModal.removeChild(popup);
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    registerForm.appendChild(registerButton);

    // Add the "Remember me" checkbox
    registerForm.appendChild(lRemember.cloneNode(true));

    // Add the form to the dialog box
    registerModal.appendChild(registerForm);

    // Show the dialog box
    registerModal.showModal();
    }
);
// Register Logic ends--------------------------------------------------------------------------------------------------------

// Listeners --------------------------------------------------------
login.addEventListener('click', evt => {
    evt.preventDefault();
    console.log("Clicked")
    loginModal.showModal()
})

profile.addEventListener('click', evt => {
    evt.preventDefault();

    // Clear the dialog box
    profileModal.innerHTML = "";

    const avatarContainer = document.createElement("div");
    avatarContainer.style.display = "flex";
    avatarContainer.style.justifyContent = "center";
    avatarContainer.style.alignItems = "center";

    const avatar = document.createElement("img");
    avatar.src = "../images/blank-profile.svg";
    avatar.alt = "Avatar";
    avatar.style.width = "100px";
    avatar.style.height = "auto";
    avatar.style.borderRadius = "50%";

    // Append the avatar to the container
    avatarContainer.appendChild(avatar);

    // Append the container to the dialog box
    profileModal.appendChild(avatarContainer);

    // Create the form
    const form = document.createElement('form');
    form.id = 'upload-avatar-form';

// Create the file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'avatar';
    fileInput.accept = 'image/*';

// Create the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Upload';

// Append the file input and submit button to the form
    form.appendChild(fileInput);
    form.appendChild(submitButton);


// Append the form to the body
    profileModal.appendChild(document.createElement('br'));
    profileModal.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Create a FormData object
        const formData = new FormData();

        // Append the selected file to the FormData object
        formData.append('avatar', form.elements.avatar.files[0]);

        // Send a POST request to the server
        try {
            const response = await fetch('https://10.120.32.94/restaurant/api/v1/users/avatar', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Update the avatar image on the page
            avatar.src = `https://10.120.32.94/restaurant/uploads/${data.data.avatar}`;

        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Create an h1 element for the username
    const username = document.createElement("h1");
    username.textContent = "Username: " + sessionStorage.getItem('username');
    profileModal.appendChild(username);

    // Create a p element for the favorite restaurant
    const favouriteRestaurant = document.createElement("p");
    favouriteRestaurant.textContent = "Favourite Restaurant: " + sessionStorage.getItem('restourant');
    profileModal.appendChild(favouriteRestaurant);

    // Show the dialog box
    profileModal.showModal();
});

about.addEventListener('click', evt => {
    evt.preventDefault();
    console.log("Clicked")
    aboutModal.innerHTML = "";
    // Create an img element for the logo
    const logo = document.createElement("img");
    logo.src = "../images/logo_q.png"; // Replace with the path to your logo
    logo.alt = "Logo";

    // Set the width and height
    logo.style.width = "100px";
    logo.style.height = "auto";
    aboutModal.appendChild(logo);

    // Create an h1 element for the name of the project
    const projectName = document.createElement("h1");
    projectName.textContent = "Ruoka Piste";
    aboutModal.appendChild(projectName);

    // Create a p element for the about text
    const aboutText = document.createElement("p");
    aboutText.textContent = "This project was made as an assignment by Jafar Jafarov. Jafestro. This site shows all available menus in universities all around Finland. And You can choose your favourite one if you've registered and logged in. "; // Replace with your about text
    aboutModal.appendChild(aboutText);
    aboutModal.showModal();
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

async function fetchMenu(id, language, interval) {
    try {
        const array = await makeFetch(`https://10.120.32.94/restaurant/api/v1/restaurants/${interval}/${id}/${language}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return array;
    } catch (error) {
        console.error('Error fetching daily menu:', error);
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
        restaurantMarkers.set(restourant._id, marker)
        const popupContent = document.createElement('div');
        const heart = document.createElement('img');
        // Kohta sain tehtyä, että jos käyttäjä on kirjautunut ja kyseinen ravintola on käyttäjän suosikki, niin sydän on punainen ja marker on punainen
        if (sessionStorage.getItem('username') !== "" && restourant._id === JSON.parse(JSON.stringify(sessionStorage.getItem('favouriteRestaurant')))) {
            heart.src = "../images/favorite_FILL1.svg";
            marker.setIcon(redIcon);
        }
        else {
            heart.src = "../images/favorite_FILL0.svg";
        }
        heart.alt = "heart";
        heart.style.display = "block";
        heart.style.width = "20px";  // Set the width
        heart.style.height = "20px"; // Set the height
        restaurantHearts.set(restourant._id, heart);
        popupContent.appendChild(heart);
        heart.addEventListener('click', function () {

            // If there is a currently favorited restaurant and it's not the same as the clicked one
            if (currentFavRestaurant && currentFavRestaurant?._id !== restourant._id) {
                // Change the heart image of the previously favorited restaurant back to favorite_FILL0.svg
                currentFavHeart.src = "../images/favorite_FILL0.svg";

                // Change the marker of the previously favorited restaurant back to the default icon
                currentFavRestaurantMarker?.setIcon(defaultIcon);
            }
            // Update the currently favorited restaurant and its heart image
            currentFavRestaurant = restourant;
            currentFavHeart = heart;

            // Update the currently favorited restaurant marker and set its icon to the red icon
            currentFavRestaurantMarker = marker;
            currentFavRestaurantMarker.setIcon(redIcon);

            sessionStorage.setItem('favouriteRestaurant', JSON.stringify(currentFavRestaurant?._id));
            sessionStorage.setItem('restourant', JSON.stringify(restourant.name));
            if (heart.src.endsWith("favorite_FILL0.svg")) {
                heart.src = "../images/favorite_FILL1.svg";
            } else {
                heart.src = "../images/favorite_FILL0.svg";
            }

            // Update the user's favorite restaurant in the database
            updateFavouriteRestaurant(currentFavRestaurant?._id);
        });

        const h3 = document.createElement('h3');
        h3.textContent = restourant.name;

        const br = document.createElement('br');

        const p = document.createElement('p');
        p.textContent = restourant.address;

        popupContent.appendChild(h3);
        popupContent.appendChild(br);
        popupContent.appendChild(p);
        marker.bindPopup(popupContent);


        // Open the popup when the mouse is over the marker
        marker.on('mouseover', function (e) {
            console.log(currentFavRestaurant?.name);
            this.openPopup();
        });

        await addMenusToMarker(marker, restourant);
    }

    // Define the icon configuration
    const myIcon = L.icon({
        iconUrl: '../images/whereIAm.gif',
        iconSize: [32, 32], // Adjust the size as needed
        iconAnchor: [16, 16] // Adjust the anchor point as needed
    });

    // Create the marker with the specified icon
    const marker = L.marker(myLocation, {icon: myIcon}).addTo(map);
    marker.bindPopup(`<h3>I am here</h3>`).openPopup();
}

//-----------------ADD MENUS--------------------------
async function addMenusToMarker(marker, restaurant) {
    marker.addEventListener('click', async () => {
        // Create a dialog box
        const dialogBox = document.createElement('dialog');
        document.body.appendChild(dialogBox);

        // Create the "Daily" button
        const dailyButton = document.createElement('button');
        dailyButton.textContent = 'Daily';
        dailyButton.addEventListener('click', () => {
            dialogBox.close();
            addMenuDialog(marker, restaurant, 'daily');
        });

        // Create the "Weekly" button
        const weeklyButton = document.createElement('button');
        weeklyButton.textContent = 'Weekly';
        weeklyButton.addEventListener('click', () => {
            dialogBox.close();
            addMenuDialog(marker, restaurant, 'weekly');
        });

        // Add the buttons to the dialog box
        dialogBox.appendChild(dailyButton);
        dialogBox.appendChild(weeklyButton);

        // Show the dialog box
        dialogBox.showModal();
    });
}

async function addMenuDialog(marker, restaurant, frequency) {
    const dialogBox = document.querySelector('#menu');
    const deleteNode = document.createElement('div');
    deleteNode.classList.add('deleteButton');
    const menuNode = document.createElement('div');
    menuNode.classList.add('menuNode');


    dialogBox.innerHTML = '';
    appendInfoToElement('❌', deleteNode);
    const xButton = deleteNode.querySelector('p');
    xButton.classList.add('closeButton');
    xButton.addEventListener('click', (e) => {
        e.preventDefault();
        dialogBox.close();
    });


    const menuArray = await fetchMenu(restaurant._id, 'en', frequency);
    console.log("Menu Array:", menuArray); // Check menu array content
    if (frequency === 'weekly') {
        for (const day of menuArray.days) {
            appendInfoToElement(day.date, menuNode, true); // Display the date
            for (const meal of day.courses) {
                appendInfoToElement(`Meal: ${meal.name}`, menuNode, true);
                appendInfoToElement(`Price: ${meal.price}`, menuNode);
                appendInfoToElement(`Diet: ${meal.diets}`, menuNode);
            }
        }
    } else if (menuArray.courses.length !== 0) {
        menuArray.courses.forEach((meal) => {
            appendInfoToElement(`Meal: ${meal.name}`, menuNode, true);
            appendInfoToElement(`Price: ${meal.price}`, menuNode);
            appendInfoToElement(`Diet: ${meal.diets}`, menuNode);
        });
    } else {
        appendInfoToElement('No Menu Found', menuNode, true); // Display a message for no menu found
    }
    const logo = document.createElement('img');
    logo.src = '../images/logo_q.png';
    logo.alt = 'Logo';
    const front = document.createElement('div');
    front.classList.add('front');
    appendInfoToElement('RUOKA PISTE', front, true, true);
    front.append(logo);
    appendInfoToElement('THE MENU', front, true, true)
    const back = document.createElement('div');
    back.classList.add('back');
    const cardNode = document.createElement('div');
    cardNode.classList.add('card');
    back.append(deleteNode, menuNode);
    cardNode.append(front, back);
    dialogBox.append(cardNode);
    dialogBox.showModal();
}

// Utils ----------------------------------------------------

async function updateFavouriteRestaurant(restaurantId) {
    // Get the token from the session storage
    const token = sessionStorage.getItem('token');

    // Create the request body
    const requestBody = {
        favouriteRestaurant: restaurantId
    };

    // Send a PUT request to the API
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Helper function to append information to an element

function appendInfoToElement(info, element, bold = false, cursive = false) {
    const pElement = document.createElement('p');
    pElement.textContent = info;
    if (bold) {
        pElement.style.fontWeight = 'bold';
    }
    if (cursive) {
        pElement.style.fontFamily = 'cursive';
    }
    element.append(pElement);
}

document.addEventListener('DOMContentLoaded', async () => {
   if (sessionStorage.getItem('username')) {
       console.log("Logged in")
       // Hide the login button and show the profile button
       document.getElementById('login').setAttribute('hidden', '');
       document.getElementById('profile').removeAttribute('hidden');
       document.getElementById('logout').removeAttribute('hidden');
   } else {
       console.log("Not logged in")
         // Show the login button and hide the profile button
         document.getElementById('login').removeAttribute('hidden');
         document.getElementById('profile').setAttribute('hidden', '');
         document.getElementById('logout').setAttribute('hidden', '');
   }
});


// Logout logic
document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault();

    // Remove the token and username from the session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('favouriteRestaurant');

    // Refresh the page
    location.reload();
});

// When the page loads
document.addEventListener('DOMContentLoaded', () => {
    const modeSwitch = document.querySelector('#mode-switch');

    // Check the localStorage item 'mode'
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('night-mode');
        modeSwitch.src = '../images/light_mode.svg';
    } else {
        document.body.classList.remove('night-mode');
        modeSwitch.src = '../images/dark_mode.svg';
    }

    // When the mode switch is clicked
    modeSwitch.addEventListener('click', () => {
        if (document.body.classList.toggle('night-mode')) {
            modeSwitch.src = '../images/light_mode.svg';
            localStorage.setItem('mode', 'dark');
        } else {
            modeSwitch.src = '../images/dark_mode.svg';
            localStorage.setItem('mode', 'light');
        }
    });
});

// When the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get the flag elements
    const fiFlag = document.querySelector('#fi');
    const enFlag = document.querySelector('#en');

    // When the Finnish flag is clicked
    fiFlag.addEventListener('click', () => {
        // Change the text content to Finnish
        document.querySelector('#login').textContent = 'Kirjaudu sisään';
        document.querySelector('#profile').textContent = 'Profiili';
        document.querySelector('#about').textContent = 'Tietoja';
        document.querySelector('#logout').textContent = 'Kirjaudu ulos';
        // Add more elements as needed...

        // Change the menu language to Finnish
        // Assuming you have a function called 'changeMenuLanguage' that takes a language code
        //changeMenuLanguage('fi');
    });

    // When the English flag is clicked
    enFlag.addEventListener('click', () => {
        // Change the text content back to English
        document.querySelector('#login').textContent = 'Login';
        document.querySelector('#profile').textContent = 'Profile';
        document.querySelector('#about').textContent = 'About';
        document.querySelector('#logout').textContent = 'Logout';
        // Add more elements as needed...

        // Change the menu language back to English
        //changeMenuLanguage('en');
    });
});

