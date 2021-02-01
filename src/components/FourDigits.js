import React from "react";
import InputContainer from "./InputContainer";
import GuessList from "./GuessList";
import uniqueAnswer from "../util/uniqueAnswer";


export default function FourDigits() {

    const MAX_GUESSES = 8;

    // 4-tuple of digits 0-9
    const [answer, setAnswer] = React.useState(uniqueAnswer());
    // Array of [[n, n, n, n], numCorrectDigits, numCorrectPlacement]
    const [guessHistory, setGuessHistory] = React.useState([]);
    const [gameIsWon, setGameIsWon] = React.useState(false);

    function restartGame() {
        setAnswer(uniqueAnswer());
        setGuessHistory([]);
        setGameIsWon(false);
    }

    function submitGuess(guess) {
        const guessAccuracy = guess.map((e, i) => {
            return guess[i] === answer[i];
        });

        const guessIsCorrect = guessAccuracy.every((e) => {
            return e;
        });

        if (guessIsCorrect) {
            setGameIsWon(true);
        } else {
            // TODO move to util
            const numCorrectPlacement = guessAccuracy.reduce((acc, e) => {
                return e ? acc + 1 : acc;
            }, 0);

            const numCorrectDigits = guess.reduce((acc, e) => {
                return answer.includes(e) ? acc + 1 : acc;
            }, 0);

            setGuessHistory(guessHistory.concat([[guess, numCorrectDigits, numCorrectPlacement]]));
        }
    }

    /**
     * Check if out of guesses (GameOver).
     */
    if (guessHistory.length === MAX_GUESSES) {
        return <div className={"game-container"}>
            <h1>Game Over.</h1>
            <p>The answer was {answer}</p>
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
            {!gameIsWon && <><InputContainer submitHandler={submitGuess}
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
