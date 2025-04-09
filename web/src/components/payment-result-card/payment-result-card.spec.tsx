import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PaymentResultCard from "./payment-result-card";

describe("PaymentResultCard", () => {
  it("renders monthly payment correctly", () => {
    render(<PaymentResultCard payment={1000} paymentSchedule="monthly" />);

    expect(screen.getByText("Payment Result")).toBeInTheDocument();
    expect(screen.getByText("Your Monthly Payment")).toBeInTheDocument();
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("per month")).toBeInTheDocument();
  });

  it("renders bi-weekly payment correctly", () => {
    render(<PaymentResultCard payment={500} paymentSchedule="bi-weekly" />);

    expect(screen.getByText("Payment Result")).toBeInTheDocument();
    expect(screen.getByText("Your Bi-Weekly Payment")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
    expect(screen.getByText("every two weeks")).toBeInTheDocument();
  });

  it("renders accelerated bi-weekly payment correctly", () => {
    render(<PaymentResultCard payment={600} paymentSchedule="accelerated" />);

    expect(screen.getByText("Payment Result")).toBeInTheDocument();
    expect(screen.getByText("Your Bi-Weekly Payment")).toBeInTheDocument();
    expect(screen.getByText("$600.00")).toBeInTheDocument();
    expect(screen.getByText("accelerated bi-weekly")).toBeInTheDocument();
  });

  it("has the correct test id", () => {
    render(<PaymentResultCard payment={1000} paymentSchedule="monthly" />);

    expect(screen.getByTestId("payment-result")).toBeInTheDocument();
  });

  it("formats currency correctly", () => {
    render(<PaymentResultCard payment={1234.56} paymentSchedule="monthly" />);

    expect(screen.getByText("$1,234.56")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<PaymentResultCard payment={1000} paymentSchedule="monthly" />);

    const paymentAmount = screen.getByText("$1,000.00");
    expect(paymentAmount).toHaveClass("text-3xl", "font-bold", "text-primary");
  });
});
