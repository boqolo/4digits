import React from "react";

export default function GameOver({answer, restartGame}) {
    return <>
        <h1>Game Over.</h1>
        <p>The 4 digits were {answer}</p>
        <button className={"pure-button pure-button-primary"}
            onClick={restartGame}>Restart
        </button>
    </>;
}