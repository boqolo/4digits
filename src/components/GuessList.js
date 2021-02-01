import React from "react";

export default function GuessList(props) {

    return (
        <>
            <label className={"guess-list-label"}>Guesses:</label>
            <div className={"pure-g guess-list"}>
                {props.guesses.map((guess, i) => {
                    return <div className={"pure-u-1-1 guess-item"}>
                        <div className={"pure-u-1-3"}>#{i + 1}</div>
                        <div className={"pure-u-1-3"}>D: {guess[1]}</div>
                        <div className={"pure-u-1-3"}>P: {guess[2]}</div>
                    </div>;
                })}
            </div>
        </>
    );

}