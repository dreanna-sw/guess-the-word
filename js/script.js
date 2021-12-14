const guessedLetters = document.querySelector(".guessed-letters");
const guessbutton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".hide");
const word = "magnolia";

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
    const guessBox = document.querySelector("input").value;
    console.log(guessBox);
    guessBox.value = "";
});