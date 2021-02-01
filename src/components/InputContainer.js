import React from "react";


export default function InputContainer(props) {

    const MAX_LENGTH = 4;

    // 4-tuple of digits 0-9
    const [guess, setGuess] = React.useState([]);
    const [canSubmit, setCanSubmit] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    /***
     * Determine if input is valid and can be submitted as a guess.
     */
    React.useEffect(function () {
        const hasGuessedBefore = undefined; // TODO easy to check if have util
        const validGuess = inputValue.length === MAX_LENGTH; // TODO check if not in guess history
        if (validGuess) {
            const nextGuess = Array.from(inputValue).map((e) => parseInt(e));
            setGuess(nextGuess);
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [inputValue]);

    function controlTextInput(ev) {
        const guessFieldValue = ev.target.value;
        const digitPressed = guessFieldValue[guessFieldValue.length - 1];
        const validKeys = "1234567890";
        if (guessFieldValue.length < inputValue.length ||
            (inputValue.length < guessFieldValue.length &&
                !inputValue.includes(digitPressed)
                && validKeys.includes(digitPressed))) {
            setInputValue(guessFieldValue);
        }
    }

    function pressedEnter(ev) {
        if (ev.key === "Enter" && canSubmit) {
            props.submitHandler(guess);
        }
    }

    return (
        <div className={"input-container"}>
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
                    onClick={() => props.submitHandler(guess)}>Submit
                </button>
            </div>
        </div>
    );

}
