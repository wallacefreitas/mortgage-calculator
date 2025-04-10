import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input Component", () => {
  it("renders input element with default attributes", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("data-slot", "input");
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    render(<Input className={customClass} />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveClass(customClass);
  });

  it("handles different input types correctly", () => {
    render(<Input type="number" />);
    const inputElement = screen.getByRole("spinbutton");

    expect(inputElement).toHaveAttribute("type", "number");
  });

  it("handles disabled state correctly", () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("disabled:opacity-50");
  });

  it("handles user input correctly", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const inputElement = screen.getByRole("textbox");

    await user.type(inputElement, "test input");
    expect(inputElement).toHaveValue("test input");
  });

  it("applies aria-invalid styles when aria-invalid is true", () => {
    render(<Input aria-invalid={true} />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("aria-invalid", "true");
    expect(inputElement).toHaveClass("aria-invalid:border-destructive");
  });

  it("forwards additional props to input element", () => {
    render(<Input placeholder="Enter text" data-testid="custom-input" />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("placeholder", "Enter text");
    expect(inputElement).toHaveAttribute("data-testid", "custom-input");
  });
});
