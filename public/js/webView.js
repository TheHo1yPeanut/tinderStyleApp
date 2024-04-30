const swiper = document.getElementById("swiperContainer");
const footer = document.getElementById("footer");

const noB = document.getElementById("noButton");
const yesB = document.getElementById("yesButton");

const settingsB = document.getElementById("settingsButton");
const profileB = document.getElementById("profileButton");

const settingsImage = document.getElementById("settingsImage");
const settingsBackground = document.getElementById("settingsBackground");
const settingsContainer = document.getElementById("settingsContainer");

var fakeCookie = [];

try{
    var userData = JSON.parse(document.getElementById('userData').getAttribute('data-user'));
    console.log(userData);
} catch(error) {
    console.log(error);
}

async function generateUsers(){

    let res = await fetch("/generate", {method: "GET"});
    let resJSON = await res.json();
    fakeCookie = fakeCookie.concat(resJSON);


}





function getRandomAndRemove() {

    console.log("did something");

    const randomIndex = Math.floor(Math.random() * fakeCookie.length);

    console.log(randomIndex);



    const removedElement = fakeCookie.splice(randomIndex, 1)[0];

    return removedElement;
}


const images = [
    'https://source.unsplash.com/random/1000x1000/?landscape',
    'https://source.unsplash.com/random/1000x1000/?forest',
    'https://source.unsplash.com/random/1000x1000/?beach',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
    'https://source.unsplash.com/random/1000x1000/?house',
]




class Card{
    constructor({
        imageUrl,
    }){
        this.imageUrl = imageUrl;
        this.#init();
    }
    
    #init = () => {
        const card = document.createElement("div");
        const name = document.createElement("p");
        card.classList.add("card");
        const img = document.createElement('img');
        img.src = this.imageUrl;
        img.classList.add("img");
        const chosenUser = getRandomAndRemove(fakeCookie);
        name.innerHTML = chosenUser.user + "Compatibility" + chosenUser.score;
        name.classList.add("cardName");
        card.append(img);
        card.append(name);
        this.element = card;
    }
}

function appendNewCard(value) {
    const card = new Card({
      imageUrl: images[value % 5],
    });
    card.element.style.setProperty("--i", value);
    swiper.append(card.element);
}

generateUsers().then(() => {
    for(let i = 0; i <= 2; i++){
        appendNewCard(i);
    }    

    getRandomAndRemove(fakeCookie);
})


function yesChoice(){
    let cards = swiper.children;

    if(fakeCookie.length < 5){
        generateUsers().then(() => {

            for(let i = 0; i<cards.length; i++){
                if(cards[i].style.getPropertyValue("--i") == 0){
                    cards[i].style.transform = "translateX(160%) rotate(45deg)";
                    setTimeout(() => {
                        cards[i].parentNode.removeChild(cards[i])
                        appendNewCard(2);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        cards[i-1].style.setProperty("--i", Number(cards[i-1].style.getPropertyValue("--i")) - 1);
                    }, 1001);
                }
            }

        });
    } else {
        for(let i = 0; i<cards.length; i++){
            if(cards[i].style.getPropertyValue("--i") == 0){
                cards[i].style.transform = "translateX(160%) rotate(45deg)";
                setTimeout(() => {
                    cards[i].parentNode.removeChild(cards[i])
                    appendNewCard(2);
                }, 1000);
            } else {
                setTimeout(() => {
                    cards[i-1].style.setProperty("--i", Number(cards[i-1].style.getPropertyValue("--i")) - 1);
                }, 1001);
            }
        }
    }


}

function noChoice(){
    let cards = swiper.children;
    if(fakeCookie.length < 5){
        generateUsers().then(() => {

            for(let i = 0; i<cards.length+1; i++){
                if(cards[i].style.getPropertyValue("--i") == 0){
                    cards[i].style.transform = "translateX(-160%) rotate(-45deg)";
                        setTimeout(() => {cards[i].parentNode.removeChild(cards[i])
                        appendNewCard(2);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        cards[i-1].style.setProperty("--i", Number(cards[i-1].style.getPropertyValue("--i")) - 1)
                    }, 1001);
                }
            }

        });
    } else {
        for(let i = 0; i<cards.length+1; i++){
            if(cards[i].style.getPropertyValue("--i") == 0){
                cards[i].style.transform = "translateX(-160%) rotate(-45deg)";
                    setTimeout(() => {cards[i].parentNode.removeChild(cards[i])
                    appendNewCard(2);
                }, 1000);
            } else {
                setTimeout(() => {
                    cards[i-1].style.setProperty("--i", Number(cards[i-1].style.getPropertyValue("--i")) - 1)
                }, 1001);
            }
        }
    }
}

yesB.addEventListener("click", yesChoice);
noB.addEventListener("click", noChoice);

profileB.addEventListener("click", () => {
    window.location.href = "/profile";
});

settingsB.addEventListener("click", () => {
    settingsImage.classList.toggle("activeSettings");
    settingsImage.classList.toggle("inactiveSettings");

    if(settingsBackground.classList.contains("hidden")){
        settingsBackground.classList.toggle("hidden");
        settingsContainer.classList.toggle("hidden");
        setTimeout(()=>{
            settingsBackground.classList.toggle("backgroundActive");
            settingsContainer.classList.toggle("hide");
        }, 1);
    } else {
        settingsBackground.classList.toggle("backgroundActive");
        settingsContainer.classList.toggle("hide");
        setTimeout(()=>{
            settingsBackground.classList.toggle("hidden");
            settingsContainer.classList.toggle("hidden");
        }, 1600);
    }
});


async function rand(){
    let res = await fetch("/generate", {method: "GET"});
    let resJSON = await res.json();
    return resJSON;
}


