import React from "react";

export default function GuessList(props) {

    return (
        <div className={"pure-g"}>
            {props.guesses.map((guess) => {
                return <>
                    <div className={""}>Your Guess Here</div>
                    <div className={""}>D: {guess[1]}</div>
                    <div className={""}>C: {guess[2]}</div>
                </>;
            })}
        </div>
    );

}