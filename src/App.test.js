import {render, screen} from "@testing-library/react";
import App from "./App";

test("renders game title", () => {
    render(<App/>);
    const titleHeader = screen.getByText(/4Digits/i);
    expect(titleHeader).toBeInTheDocument();
});

test("renders input container components", () => {
    render(<App/>);
    const submitButton = screen.getByText(/Submit/i);
    const clearButton = screen.getByText(/Clear/i);
    const restartButton = screen.getByText(/Restart/i);

    expect(submitButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(restartButton).toBeInTheDocument();
});
