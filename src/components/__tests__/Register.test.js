import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";
import { useDispatch } from "react-redux";
import Theme from "../../theme";
import { ThemeProvider } from "styled-components";


jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));

describe("Resgister test", () => {
  it("should add new guide", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
    <ThemeProvider theme={Theme}>
    <Form />
    </ThemeProvider>
);


    fireEvent.change(screen.getByLabelText(/Number/i), {
    target: { value: "001" }
    });
    fireEvent.change(screen.getByLabelText(/Origin/i), {
    target: { value: "Ciudad A" }
    });
    fireEvent.change(screen.getByLabelText(/Destination/i), {
    target: { value: "Ciudad B" }
    });
    fireEvent.change(screen.getByLabelText(/Receiver/i), {
    target: { value: "Juan Perez" }
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
    target: { value: "2025-06-30" }
    });


    fireEvent.click(screen.getByLabelText("Pendiente"));

  
    fireEvent.click(screen.getByRole("button", { name: /registrar guía/i }));


    expect(mockDispatch).toHaveBeenCalledWith({
      type: "guides/addGuide",
      payload: {
        number: "001",
        origin: "Ciudad A",
        destination: "Ciudad B",
        receiver: "Juan Perez",
        date: "2025-06-30",
        state: "Pendiente"
      }
    });
  });
});
