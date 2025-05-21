//Memory
class Card {
    constructor(url, id, theme) {
        this.url = url;
        this.id = id;
        this.theme = theme;
    }
}

let selectedDifficulty = null;
let selectedAnimal = null;

const difficultyButtons = document.querySelectorAll(".difficultyButton");
for (let i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].addEventListener("click", function () {
        selectedDifficulty = this.value;

        for (let j = 0; j < difficultyButtons.length; j++) {
            difficultyButtons[j].classList.remove("selected");
        }
        this.classList.add("selected")
    })
}

const animalButtons = document.querySelectorAll(".animalButton");
for (let i = 0; i < animalButtons.length; i++) {
    animalButtons[i].addEventListener("click", function () {
        selectedAnimal = this.value;

        for (let j = 0; j < animalButtons.length; j++) {
            animalButtons[j].classList.remove("selected")
        }
        this.classList.add("selected")
    })
}
//Vi skapar två varibler. En för svårighetsgrad och en för djuret.
//Vi loopar igenom alla knappar och tar ut värden från knappen som klickas.
//Använder en nästlad loop för att ta bort classen selected från en knapp.
//Sen lägger vi även till classen selected för den man trycker på.

const startButton = document.querySelector("#startButton");

startButton.addEventListener("click", async function () {

    const numberOfCards = Number(selectedDifficulty);
    const animalValue = selectedAnimal;
    const numberOfUniqueImages = numberOfCards / 2;

    let images = [];

    async function getImage(animal) {
        if (animal === "dog") {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            console.log(data.message);
            return data.message;
        }
        if (animal === "fox") {
            const response = await fetch("https://randomfox.ca/floof/");
            const data = await response.json();
            return data.image;
        }
        if (animal === "cat") {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            return data[0].url;
        }
    }

    for (let i = 0; i < numberOfUniqueImages; i++) {
        const imageURL = await getImage(animalValue);
        console.log(imageURL);
        const id = i;
        console.log(id, "id för bilden");
        const image = new Card(imageURL, id, animalValue);
        images.push(image);
    }

    console.log(images.length, "den nuvarande längden på arrayen, borde vara 3");
    //Här loopar vi igenom hälften så många gånger som svårighetsgraden. Till exempel
    //Svårighetsgrad lätt vilket är 6 kort i memoryt, då loopar vi igenom 3 gånger.
    //Vi anropar då getImage 3 gånger där vi fetchar det valda djuret.
    //Vi får ut 3 bilder som vi pushar till image arrayen.
    // images.forEach(img => {
    //     const copyOfOrginialImage = new Card(img.url, img.id, img.theme);
    //     images.push(copyOfOrginialImage);
    //     console.log(images, images.length, "bör innehålla alla korten, alltså alla par");
    // })

    // //Vi skapar en cards array. Vi loopar igenom images där vi nu har i detta fall 3 bilder.
    // //För varje instans så pushar vi det objektet i arrayen två gånger.
    // //cards inehåller nu 6 objekt.

    // images.sort(function () {
    //     return Math.random() - 0.5;
    // })
    // //Här blandar vi korten. Förstår inte riktigt denna rad men ska se om det finns ett 
    // //enklare sätt att göra det.

    // const gameBoard = document.querySelector("#gameBoard");
    // gameBoard.innerHTML = "";

    // for (let i = 0; i < images.length; i++) {
    //     const img = document.createElement("img");
    //     img.src = images[i];
    //     img.style.width = "100px"
    //     gameBoard.appendChild(img);
    // }
    //Här selekterar vi vart vi vill att korten ska hamna.
    //Vi loopar sedan igenom cards och skapar en img för varje instans.
})
//Memory