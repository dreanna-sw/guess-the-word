const guessedLettersList = document.querySelector(".guessed-letters");
const guessbutton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".hide");
const word = "magnolia";
const guessedLetters = [];


const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholders(word);

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
            updatedCharacter.push(letter);
        } else {
            updatedCharacter.push("●");
        }
    }
    wordInProgress.innerText = updatedCharacter.join("");
    verifyGuess();
};

const verifyGuess = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};