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
});
