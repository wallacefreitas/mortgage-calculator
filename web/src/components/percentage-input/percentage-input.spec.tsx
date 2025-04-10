import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PercentageInput from "./percentage-input";

describe("PercentageInput", () => {
  const defaultProps = {
    id: "test-input",
    label: "Interest Rate",
    value: "",
    placeholder: "Enter rate",
    onChange: vi.fn(),
  };

  it("renders with label and percentage sign", () => {
    render(<PercentageInput {...defaultProps} />);

    expect(screen.getByText("Interest Rate")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(<PercentageInput {...defaultProps} value="5.5" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("5.5");
  });

  it("calls onChange with formatted value", () => {
    const onChange = vi.fn();
    render(<PercentageInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "5.55" } });

    expect(onChange).toHaveBeenCalledWith("5.55");
  });

  it("formats decimal numbers correctly", () => {
    const onChange = vi.fn();
    render(<PercentageInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "5.5.5" } });

    expect(onChange).toHaveBeenCalledWith("5.5");
  });

  it("allows numeric input", () => {
    const onChange = vi.fn();
    render(<PercentageInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "5" });

    const event = new KeyboardEvent("keydown", {
      key: "5",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    input.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it("prevents non-numeric input", () => {
    render(<PercentageInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    const event = new KeyboardEvent("keydown", {
      key: "a",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    input.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("allows special keys", () => {
    render(<PercentageInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    const specialKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    specialKeys.forEach((key) => {
      const event = new KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");
      input.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  it("allows decimal point input", () => {
    render(<PercentageInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    const event = new KeyboardEvent("keydown", {
      key: ".",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    input.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it("applies correct CSS classes", () => {
    render(<PercentageInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pr-7");
  });

  it("sets input mode to numeric", () => {
    render(<PercentageInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("inputmode", "numeric");
  });

  it("displays placeholder text", () => {
    render(<PercentageInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter rate");
  });
});
