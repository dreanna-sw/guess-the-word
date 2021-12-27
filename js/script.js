const guessedLettersList = document.querySelector(".guessed-letters");
const guessbutton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".hide");

let word = "magnolia";
const guessedLetters = [];
let remainingNumGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholders(word);
};

getWord();


const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessbutton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guessBox = letter.value;
    //console.log(guessBox);
   
    const validInput = playerInput(guessBox);
    //console.log(validInput);

    if (validInput) {
        makeGuess(guessBox);
    }
    letter.value = "";
});

const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please only guess one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter letters from A-Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guessBox) {
    guessBox = guessBox.toUpperCase();
    if (guessedLetters.includes(guessBox)) {
        message.innerText = "You've already guessed that letter. Please try again.";
    } else {
       guessedLetters.push(guessBox);
       console.log(guessedLetters); 
       playerGuesses();
       countGuesses(guessBox);
       updateWord(guessedLetters);
    }
};

const playerGuesses = function (guessBox) {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersList.append(listItem);
    }
};

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedCharacter = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedCharacter.push(letter.toUpperCase());
        } else {
            updatedCharacter.push("●");
        }
    }
    wordInProgress.innerText = updatedCharacter.join("");
    verifyGuess();
};

const countGuesses = function (guessBox) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guessBox)) {
        message.innerText = `Sorry, the word does not contain ${guessBox}`;
        remainingNumGuesses -= 1;
    } else {
        message.innerText = `Nice guess, the word contains ${guessBox}`;
    }

    if (remainingNumGuesses === 0) {
        message.innerHTML = `<p class="highlight"> Game Over! The word was "${word}".</p>`;
        remainingSpan.innerText = `${remainingNumGuesses} guesses`;
    } else if (remainingNumGuesses === 1) {
        remainingSpan.innerText = `${remainingNumGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingNumGuesses} guesses`;
    }
};

const verifyGuess = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

