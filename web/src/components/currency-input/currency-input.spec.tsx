import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CurrencyInput from "./currency-input";

describe("CurrencyInput", () => {
  const defaultProps = {
    id: "test-input",
    label: "Test Label",
    value: "",
    onChange: vi.fn(),
  };

  it("renders with label and dollar sign", () => {
    render(<CurrencyInput {...defaultProps} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(<CurrencyInput {...defaultProps} value="1,000" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("1,000");
  });

  it("formats currency value on change", () => {
    const onChange = vi.fn();
    render(<CurrencyInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1000" } });

    expect(onChange).toHaveBeenCalledWith("1,000");
  });

  it("allows numeric input", () => {
    render(<CurrencyInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "1" });

    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  // it("prevents non-numeric input", () => {
  //   render(<CurrencyInput {...defaultProps} />);

  //   const input = screen.getByRole("textbox");
  //   const event = new KeyboardEvent("keydown", {
  //     key: "a",
  //     bubbles: true,
  //     cancelable: true,
  //   });

  //   const preventDefaultSpy = vi.spyOn(event, "preventDefault");

  //   input.dispatchEvent(event);

  //   expect(preventDefaultSpy).toHaveBeenCalled();
  // });

  // it("allows special keys", () => {
  //   render(<CurrencyInput {...defaultProps} />);

  //   const input = screen.getByRole("textbox");
  //   const preventDefaultMock = vi.fn();

  //   const specialKeys = [
  //     "Backspace",
  //     "Delete",
  //     "ArrowLeft",
  //     "ArrowRight",
  //     "Tab",
  //   ];

  //   specialKeys.forEach((key) => {
  //     fireEvent.keyDown(input, {
  //       key,
  //       preventDefault: preventDefaultMock,
  //     });
  //   });

  //   expect(preventDefaultMock).not.toHaveBeenCalled();
  // });

  // it("applies correct CSS classes", () => {
  //   render(<CurrencyInput {...defaultProps} />);

  //   const input = screen.getByRole("textbox");
  //   expect(input).toHaveClass("pl-8", "bg-blue-50");
  // });

  // it("sets input mode to numeric", () => {
  //   render(<CurrencyInput {...defaultProps} />);

  //   const input = screen.getByRole("textbox");
  //   expect(input).toHaveAttribute("inputmode", "numeric");
  // });
});
