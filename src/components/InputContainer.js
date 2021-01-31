import React from "react";


export default function InputContainer(props) {

    // 4-tuple of digits 0-9
    const [guess, setGuess] = React.useState(props.ans); // TODO init empty
    const [canSubmit, setCanSubmit] = React.useState(false);

    React.useEffect(function () {
        // TODO guess submission validation
        let isValidGuess = true;
        if (isValidGuess) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [guess]);

    // TODO Keyboard controlled input; setGuess

    return (
        <div className={"input-container"}>
            <input className={"guess-field"} type={"text"}
                maxLength={4} autoFocus={false}/>
            <div className={"buttons-container"}>
                <button className={"pure-button medium"}
                    onClick={() => console.log("PRESSED RESET")}>Reset
                </button>
                <button className={"pure-button pure-button-primary medium"}
                    onClick={() => props.submitHandler(guess)}>Submit
                </button>
            </div>
        </div>
    );

}
