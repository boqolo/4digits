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
    const [gameIsLost, setGameIsLost] = React.useState(false);

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


    // React.useEffect(function () {
    //     if (guessHistory.length === MAX_GUESSES) {
    //         setGameIsLost(true);
    //     }
    // }, [guessHistory]);


    return (
        <div className={"game-container center"}>
            {gameIsWon && <h1>You won!</h1>}
            {gameIsLost && <h1>Game Over :(</h1>}
            <h1>Answer is: {answer}</h1>
            <InputContainer submitHandler={submitGuess} ans={answer}/>
            {/*<GuessList guesses={guessHistory}/>*/}
        </div>
    );

}
