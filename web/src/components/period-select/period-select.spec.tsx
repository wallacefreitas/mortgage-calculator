import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PeriodSelect from "./period-select";

describe("PeriodSelect", () => {
  const defaultProps = {
    id: "amortizationPeriod",
    value: "",
    onChange: vi.fn(),
  };

  it("renders with correct label", () => {
    render(<PeriodSelect {...defaultProps} />);
    expect(screen.getByText("Amortization Period")).toBeInTheDocument();
  });

  it("displays placeholder when no value is selected", () => {
    render(<PeriodSelect {...defaultProps} />);
    expect(screen.getByText("Select period")).toBeInTheDocument();
  });

  it("shows all period options when clicked", () => {
    render(<PeriodSelect {...defaultProps} />);

    // Open the select dropdown
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    // Verify all options are present
    const expectedOptions = [
      "5 years",
      "10 years",
      "15 years",
      "20 years",
      "25 years",
      "30 years",
    ];
    expectedOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onChange with correct value when option is selected", () => {
    const onChange = vi.fn();
    render(<PeriodSelect {...defaultProps} onChange={onChange} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const option = screen.getByText("15 years");
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith("15");
  });

  it("displays selected value", () => {
    render(<PeriodSelect {...defaultProps} value="20" />);
    expect(screen.getByText("20 years")).toBeInTheDocument();
  });

  // it("has correct test id", () => {
  //   render(
  //     <PeriodSelect
  //       {...defaultProps}
  //       data-testid="amortization-period-select"
  //     />
  //   );

  //   expect(
  //     screen.getByTestId("amortization-period-select")
  //   ).toBeInTheDocument();
  // });

  it("applies correct width class to trigger", () => {
    render(<PeriodSelect {...defaultProps} />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("w-full");
  });

  // it("passes additional props to Select component", () => {
  //   const testId = "custom-test-id";
  //   render(<PeriodSelect {...defaultProps} data-testid={testId} />);

  //   const element = screen.getByRole("combobox");
  //   expect(element).toHaveAttribute("data-testid", testId);
  // });

  it("maintains correct order of period options", () => {
    render(<PeriodSelect {...defaultProps} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const options = screen.getAllByRole("option");
    const values = options.map((option) => option.textContent);

    expect(values).toEqual([
      "5 years",
      "10 years",
      "15 years",
      "20 years",
      "25 years",
      "30 years",
    ]);
  });
});
