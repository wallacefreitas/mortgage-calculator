import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MortgageCalculator from "./index";

vi.mock("../../hooks/useDownPaymentValidator/useDownPaymentValidator", () => ({
  useDownPaymentValidator: () => ({
    validate: vi.fn().mockImplementation((downPayment, propertyPrice) => ({
      isDownPaymentValid: downPayment <= propertyPrice,
      message:
        downPayment > propertyPrice
          ? "Down payment cannot exceed property price"
          : null,
    })),
  }),
}));

vi.mock("../../hooks/useCalculateMortgage/useCalculateMortgage", () => ({
  useCalculateMortgage: () => ({
    executeCalculateMortgage: vi.fn().mockResolvedValue(1500.0),
  }),
}));

describe("MortgageCalculator", () => {
  beforeEach(() => {
    render(<MortgageCalculator />);
  });

  it("displays error when down payment exceeds property price", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "500000");
    await user.type(screen.getByLabelText(/Down Payment/i), "600000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "5");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Down payment cannot exceed property price")
      ).toBeInTheDocument();
    });
  });
});
