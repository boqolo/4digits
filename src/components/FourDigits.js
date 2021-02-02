import React from "react";
import InputField from "./InputField";
import GuessList from "./GuessList";
import {
    create4Digits,
    getGuessAccuracy,
    isDuplicateGuess,
    isGuessCorrect,
    getBulls,
    getCows
} from "../util/logic";

// Main Game Component
export default function FourDigits() {

    const MAX_GUESSES = 8;

    // 4-tuple of digits 0-9
    const [answer, setAnswer] = React.useState(create4Digits());
    // Array of [[n, n, n, n], numCorrectDigits, numCorrectPlacement]
    const [guessHistory, setGuessHistory] = React.useState([]);
    const [gameIsWon, setGameIsWon] = React.useState(false);

    function restartGame() {
        setAnswer(create4Digits());
        setGuessHistory([]);
        setGameIsWon(false);
    }

    function submitGuess(guess) {
        if (isDuplicateGuess(guess, guessHistory)) {
            return;
        }

        const guessAccuracy = getGuessAccuracy(guess, answer);
        const guessIsCorrect = isGuessCorrect(guessAccuracy);

        if (guessIsCorrect) {
            setGameIsWon(true);
        } else {
            const numCorrectPlace = getBulls(guessAccuracy);
            const numCorrectDigits = getCows(guess, answer);
            const archivedGuess = [[guess, numCorrectDigits, numCorrectPlace]];
            setGuessHistory(guessHistory.concat(archivedGuess));
        }
    }

    /**
     * Check if out of guesses (GameOver).
     */
    if (guessHistory.length === MAX_GUESSES) {
        return <div className={"game-container"}>
            <h1>Game Over.</h1>
            <p>The 4 digits were {answer}</p>
            <button className={"pure-button pure-button-primary"}
                onClick={restartGame}>Restart
            </button>
        </div>;
    }


    return (
        <div className={"game-container"}>
            <h1 className={"game-title-header"}>4Digits</h1>
            {gameIsWon && <>
                <h1 className={"game-won-header"}>You won!</h1>
                <h2>The 4 digits were: {answer}</h2>
                <button className={"pure-button pure-button-primary"}
                    onClick={restartGame}>Restart
                </button>
            </>}
            <p>Answer is: {answer}</p>
            {!gameIsWon && <><InputField submitHandler={submitGuess}
                guessesSoFar={guessHistory}/>
            <div className={"button-main-restart-container"}>
                <button className={"pure-button button-main-restart"}
                    onClick={restartGame}>Restart
                </button>
            </div>
            </>}
            <GuessList guesses={guessHistory}/>
        </div>
    );

}
