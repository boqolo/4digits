import React from "react";
import GuessControls from "./GuessControls";
import GuessHistory from "./GuessHistory";
import {
    create4Digits,
    getGuessAccuracy,
    isDuplicateGuess,
    isGuessCorrect,
    getBulls,
    getCows
} from "../util/logic";
import GameOver from "./GameOver";

// Main Game Component
export default function FourDigits() {

    const MAX_GUESSES = 8;

    // 4-tuple of digits 0-9
    const [answer, setAnswer] = React.useState(create4Digits());
    // Array of [[n, n, n, n], numCorrectDigits, numCorrectPlacement]
    const [inputValue, setInputValue] = React.useState("");
    const [guessHistory, setGuessHistory] = React.useState([]);
    const [gameIsWon, setGameIsWon] = React.useState(false);

    function restartGame() {
        setAnswer(create4Digits());
        setGuessHistory([]);
        setGameIsWon(false);
        setInputValue("");
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
     * Conditionally select body.
     */
    let body;

    if (guessHistory.length === MAX_GUESSES) {
        body = <GameOver answer={answer} restartGame={restartGame}/>;
    } else {
        body =
            <>
                <h1 className={"game-title-header"}>4Digits</h1>
                {gameIsWon && <>
                    <h1 className={"game-won-header"}>You won!</h1>
                    <h2>The 4 digits were: {answer}</h2>
                    <button className={"pure-button pure-button-primary"}
                        onClick={restartGame}>Restart
                    </button>
                </>}
                {!gameIsWon && <>
                    <GuessControls inputValue={inputValue}
                        setInputValue={setInputValue}
                        submitHandler={submitGuess}
                        guessesSoFar={guessHistory}/>
                    <div className={"button-main-restart-container"}>
                        <button className={"pure-button button-main-restart"}
                            onClick={restartGame}>Restart
                        </button>
                    </div>
                </>}
                <GuessHistory guesses={guessHistory}/>
            </>;
    }


    return (
        <div className={"game-container"}>
            {body}
        </div>
    );

}
