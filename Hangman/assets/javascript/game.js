//Global variables
var wordBank = ["APPLE", "ORANGE", "BANANA", "BLACKBERRY", "COCONUT", "ELDERBERRY", "TOMATO", "LOQUAT", "LEMON", "LEMONADE"]
const maxAttempts = 10 //const so I dont change it accidentally
var allGuessedLetters = []; //empty array for storage
    currentWordIndex
    correctGuessedLetters = []
    remainingGuesses = 0 //modify on game startup
    gameStarted = false
    gameFinished = false //to display try again message
    wins = 0 
    losses = 0

//Start of the game. Resets all the variables
function gameReset() {
    remainingGuesses = maxAttempts
    gameStarted = false //this has to be here or it breaks

    //math.floor rounds the random number down to the nearest integer to avoid decimals.
    //Selects a random word for the game
    currentWordIndex = Math.floor(Math.random()) * (wordBank.length);

    //clears out arrays from last game
    allGuessedLetters = []
    correctGuessedLetters = []

    //creates the underscores by taking the word length and creating that many underscores with a loop
    for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
        correctGuessedLetters.push("_");
    }

    //Updates the page
    updateDisplay(); //check if this works in order
}

    //function to update the page using .getelementbyid spam. There might be a better way to do this
    function updateDisplay() {
        document.getElementById("totalWins").innerText = wins; //updates wins using wins variable
        document.getElementById("totalLosses").innerText = losses;
        document.getElementById("currentword").innerText = "";
        for (let i = 0; i < correctGuessedLetters.length; i++) {
            document.getElementById("currentword").innerText += correctGuessedLetters[i]; //replces _ with correct letters
        }
        document.getElementById("remainingGuesses").innerText = remainingGuesses
        document.getElementById("allGuessedLetters")
        if(remainingGuesses <= 0) {
            document.getElementById("tryAgain") //still needs to show/hide  (CSS)
            gameFinished = true
        }
    }

    //creating function needed for input capturing. Nested ifs to start the game and ensure that there are no duplicate guesses

    function guessMade(letter) {
        if (remainingGuesses > 0) {
            if (gameStarted = false) {
                gameStarted = true
            }
            // returns -1 if letter isn't already in the array
            if (allGuessedLetters.indexOf(letter) === -1) {
                allGuessedLetters.push(letter)
                checkGuess(letter) //defined after input capturing
            }
        }
        updateDisplay()
        checkWin() //defined later
    }

    //Captures the input (BACKSPACE DOES NOT ELIM LETTER)
    document.onkeypress = function(event) {
        if (gameFinished = true) {
            gameReset()
            gameFinished = false } //needed to prevent a loop
        else {
                if(event.keyCode >= 65 && event.keyCode <= 90) {
                    guessMade(event.key.toLowerCase()); } //Checks if the input is a letter. .keycode checks the Unicode value of the input. 65 is a, 90 is z. && means "and". Then converts to lowercase so uppercase letters work.  Alt option is using if (/[a-z0-9]/i.test(charStr)) but that also accepts numbers and I can't read it
        }
    }

    //takes the input and checks against the current word, then replaces them if needed

    function checkGuess(letter) {
        var letterPositions = []; //used for letter positions/dups

        for (let i = 0; i < wordBank[currentWordIndex].length; i++) {
            if (wordBank[currentWordIndex][i] === letter) {
                letterPositions.push(i)
                //loops through the word to find all copies of the guessed letter and stores it to an array
            }
        }
        //checks if right/wrong

        //wrong guess code. Removes a guess
        if (letterPositions.length <= 0) {
            remainingGuesses--; }
            else {
                //loops through all spaces and replaces underscore with the letter
                for (let i = 0; i <letterPositions.length; i++) {
                    correctGuessedLetters[letterPositions[i]] = letter;
                }
            }
        }

        //Check for a win!
        function checkWin() {
            if (correctGuessedLetters.indexOf("_") === -1) {
                document.getElementById("tryAgain").style.cssText= "display: block";
                wins++
                gameFinished = true
            }
        }