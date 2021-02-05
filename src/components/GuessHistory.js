import React from "react";

export default function GuessHistory({guesses}) {

    return (
        <div className={"guesses-container"}>
            <label className={"guess-list-label"}>Guesses:</label>
            <div className={"pure-g guess-list"}>
                {guesses.map((guess, i) => {
                    return <div className={"pure-u-1-1 guess-item"}>
                        <div className={"pure-u-1-6"}>#{i + 1}</div>
                        <div className={"pure-u-1-4"}>{guess[0]}</div>
                        <div className={"pure-u-1-4"}>B: {guess[2]}</div>
                        <div className={"pure-u-1-4"}>C: {guess[1]}</div>
                    </div>;
                })}
            </div>
        </div>
    );

}