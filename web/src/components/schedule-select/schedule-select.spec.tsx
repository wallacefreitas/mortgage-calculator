import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ScheduleSelect from "./schedule-select";

describe("ScheduleSelect", () => {
  it("renders payment schedule label", () => {
    render(<ScheduleSelect value="" onChange={() => {}} />);
    expect(screen.getByText("Payment Schedule")).toBeInTheDocument();
  });

  it("displays the correct placeholder when no value is selected", () => {
    render(<ScheduleSelect value="" onChange={() => {}} />);
    expect(screen.getByText("Select schedule")).toBeInTheDocument();
  });

  it("shows all payment schedule options", async () => {
    render(<ScheduleSelect value="" onChange={() => {}} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    expect(screen.getByText("Accelerated Bi-Weekly")).toBeInTheDocument();
    expect(screen.getByText("Bi-Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("calls onChange when a value is selected", async () => {
    const handleChange = vi.fn();
    render(<ScheduleSelect value="" onChange={handleChange} />);

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const option = screen.getByText("Monthly");
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith("monthly");
  });

  it("displays the selected value", () => {
    render(<ScheduleSelect value="monthly" onChange={() => {}} />);
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });
});
