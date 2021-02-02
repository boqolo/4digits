import React from "react";
import {isValidInput, isDuplicateGuess} from "../util/logic";

export default function MakeGuess(props) {

    const MAX_LENGTH = 4;

    // 4-tuple of digits 0-9
    const [guess, setGuess] = React.useState([]);
    const [canSubmit, setCanSubmit] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    function submitGuess() {
        props.submitHandler(guess);
        setInputValue("");
    }

    /***
     * Determine if input is valid and can be submitted as a guess.
     */
    React.useEffect(function () {
        const validGuess = inputValue.length === MAX_LENGTH;
        if (validGuess) {
            const nextGuess = Array.from(inputValue).map((e) => parseInt(e));
            const hasGuessedBefore = isDuplicateGuess(nextGuess, props.guessesSoFar);

            if (!hasGuessedBefore) {
                setGuess(nextGuess);
                setCanSubmit(true);
            }
        } else {
            setCanSubmit(false);
        }
    }, [inputValue]);

    /**
     * Validate input.
     * @param ev Keyboard event
     */
    function controlTextInput(ev) {
        const newInputValue = ev.target.value;
        const keyPressed = newInputValue[newInputValue.length - 1];
        if (isValidInput(inputValue, newInputValue, keyPressed)) {
            setInputValue(newInputValue);
        }
    }

    /**
     * Allow pressing enter for guess submission.
     * @param ev Keyboard event
     */
    function pressedEnter(ev) {
        if (ev.key === "Enter" && canSubmit) {
            submitGuess(guess);
        }
    }

    return (
        <div className={"input-container"} role={"group"}>
            <input className={"guess-field"} type={"text"} value={inputValue}
                onKeyPress={pressedEnter}
                maxLength={MAX_LENGTH} autoFocus={false}
                onChange={controlTextInput}/>
            <div className={"buttons-container"}>
                <button className={"pure-button"}
                    onClick={() => setInputValue("")}>Clear
                </button>
                <button className={"pure-button pure-button-primary"}
                    disabled={!canSubmit}
                    onClick={() => submitGuess(guess)}>Submit
                </button>
            </div>
        </div>
    );
}
