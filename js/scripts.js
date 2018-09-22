let eeData = [];

//Add Search Field
const searchCont = document.getElementsByClassName('search-container');
searchCont[0].innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;
const searchField = document.getElementById('search-input');


const gallery = document.getElementById('gallery');
const galleryCards = gallery.children;

//create and hide modal div
const modalCont = document.createElement('div');
modalCont.className = 'modal-container';
modalCont.style.display = "none";
const nextButton = document.getElementById('modal-next');
const prevButton = document.getElementById('modal-prev');
const modalButtons = document.getElementsByClassName('modal-container');
const modalCards = document.getElementsByClassName('modal');
const script = document.getElementsByTagName('script');
document.body.insertBefore(modalCont,script[0]);

const states = { //used to set abbreviations for states
    alabama : 'AL',    alaska : 'AK',    arizona : 'AZ',
    arkansas : 'AR',    california : 'CA',    colorado : 'CO',
    connecticut : 'CT',    delaware : 'DE',    florida : 'FL',
    georgia : 'GA',    hawaii : 'HI',    idaho : 'ID',
    illinois : 'IL',    indiana : 'IN',    iowa : 'IA',
    kansas : 'KS',    kentucky : 'KY',    louisiana : 'LA',
    maine : 'ME',    maryland : 'MD',    massachusetts : 'MA',
    michigan : 'MI',    minnesota : 'MN',    mississippi : 'MS',
    missouri : 'MO',    montana : 'MT',    nebraska : 'NE',
    nevada : 'NV',    'new hampshire' : 'NH',    "new jersey" : 'NJ',
    "new mexico": 'NM',    "new york" : 'NY',    "north carolina" :' NC',
    "north dakota" : 'ND',    ohio : 'OH',    oklahoma : 'OK',
    oregon : 'OR',    pennsylvania : 'PA',    "rhode island" : 'RI',
    "south carolina" : 'SC',    "south dakota" : 'SD',    tennessee : 'TN',
    texas : 'TX',    utah : 'UT',    vermont : 'VT',
    virginia : 'VA',    washington : 'WA',    "west virginia" : 'WV',
    wisconsin : 'WI',    wyoming : 'WY'
}


// Fetch functionality ***********************
const url = 'https://randomuser.me/api/?results=12&&nat=us'

//fetches 12 uses from api
fetch(url)
    .then(response => response.json())
    .then(data => {
        eeData = data.results;
        renderCard(data.results);
        renderModal(data.results);
    })


 
// Helper Functions ***********************
//  creates the gallery card divs and adds them to the gallery div.
function renderCard(data) {
    const galleryCards = data.map(item => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${item.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="card-text">${item.email}</p>
                <p class="card-text cap">${item.location.city}</p>
            </div>
        </div>
    `).join('');
    gallery.innerHTML = galleryCards;
}


   
//  creates the modal divs, and adds to variable modalDivs
// sets dob to the date of birth in Mon/Date/Year format
// sets state names equal to abbreviations
function renderModal(data) {    
     let modalDivs = data.map(item => {
        let date =  new Date(item.dob.date);
        let month = date.getUTCMonth() +1;
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();
        let dob = `${month}/${day}/${year}`
        let itemState = item.location.state;
        let state = states[itemState];
        return `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${item.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="modal-text">${item.email}</p>
                <p class="modal-text cap">${item.location.city}</p>
                <hr>
                <p class="modal-text">${item.phone}</p>
                <p class="modal-text cap">${item.location.street} ${item.location.city}, ${state} ${item.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}</p>
            </div>
            </div>
    `}).join('');

    // adds next and previous buttons to modalDivs, then adds that to the modal container
    modalDivs += `<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div></div>`;
    modalCont.innerHTML = modalDivs;
   
}




// Event Listeners ***********************

//Open Modal Window
gallery.addEventListener('click', function (e) {
    let card;
    //if click is on the main gallery div, do nothing
   if (e.target.tagName === 'DIV' && e.target.className==="gallery") {
       //do nothing
   } else { //based on what part of the div is clicked, sets variable card equal to div with class card
       if (e.target.tagName !== 'DIV') {
         card = e.target.parentElement.parentElement;
       } else if (e.target.tagName === 'DIV' && (e.target.className === "card-img-container" || e.target.className === "card-info-container")) {
           card = e.target.parentElement;
       } else {
           card = e.target;
       } //looks for the name of clicked card in the modal cards. displays the match and hides the rest
      let name = card.children[1].children[0].innerText.toLowerCase();
       for (let i = 0; i < modalCards.length; i ++) {
        let modalName = modalCards[i].children[1].children[1].innerText.toLowerCase();
        if (modalName === name) {
            modalCards[i].style.display = "block";
        } else {
            modalCards[i].style.display = "none";
        }
           
       } // sets the modal container to display
       modalCont.style.display = "block";
   } //end else
});

modalCont.addEventListener('click', function (e){
    //if the 'X' in the modal window or outside the modal window is clicked,  display = none
    if (e.target.className === 'modal-close-btn' ||e.target.tagName === 'STRONG' || e.target.className === "modal-container") {
    modalCont.style.display = "none";
    // if next/previous button, sets a counter to -1
    } else if (e.target.className === 'modal-prev btn' || e.target.className === 'modal-next btn') {
        let count = -1;
        //loops through modals cards for currently displayed, changes count to its index
        for (let i = 0; i < modalCards.length; i++ ){
            if( modalCards[i].style.display === 'block'){
                count = i;
            }       
        }
            //changes display of current card to none, while display either previous or next
            //does not allow the prev button to work below first card, or next button above last card
            if(e.target.className === 'modal-prev btn') {
                if(count > 0){
                    modalCards[count-1].style.display = 'block';
                    modalCards[count].style.display = "none";
                    
                }
                
            } else if (e.target.className === 'modal-next btn'){
                if (count < modalCards.length - 1) {
                    modalCards[count+1].style.display = 'block';
                    modalCards[count].style.display = "none";
                    
                }
            }
            
    } 
    
});

//allows escape key to exit modal window
document.addEventListener('keyup', function (e){
    if(modalCont.style.display === 'block' && e.key === 'Escape') {
        modalCont.style.display = 'none';
    }
  
});

//searches for search input in the name of each gallery card
function search(e) {
    e.preventDefault();
    let searchTerm = searchField.value.toLowerCase();
    for (let i = 0; i < galleryCards.length; i++) {
     let galleryName = galleryCards[i].children[1].children[0].innerText.toLowerCase();
     if(galleryName.includes(searchTerm)) {
         galleryCards[i].style.display="flex";
     } else {
         galleryCards[i].style.display="none";
     }
    }
}

//calls search function on 'submit'
searchCont[0].addEventListener('submit', function (e){
    search(e);
});

//calls search function on 'keyup'. allows for instantaneous search.
searchCont[0].addEventListener('keyup', function (e) {
  search(e);
});




















