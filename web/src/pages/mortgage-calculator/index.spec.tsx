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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the mortgage calculator form", () => {
    expect(screen.getByLabelText("Property Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Down Payment")).toBeInTheDocument();
    expect(screen.getByLabelText("Annual Interest Rate")).toBeInTheDocument();
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

  it("calculates mortgage with standard down payment and interest rate", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "400000");
    await user.type(screen.getByLabelText(/Down Payment/i), "80000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "4.5");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  it("calculates mortgage with minimum down payment", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "300000");
    await user.type(screen.getByLabelText(/Down Payment/i), "15000"); // 5% down payment
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "3.5");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  it("calculates mortgage with maximum interest rate", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "350000");
    await user.type(screen.getByLabelText(/Down Payment/i), "70000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "100");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  it("handles very large property values", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "2000000");
    await user.type(screen.getByLabelText(/Down Payment/i), "400000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "4.75");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  it("handles zero down payment calculation", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "200000");
    await user.type(screen.getByLabelText(/Down Payment/i), "0");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "3");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  it("handles decimal interest rates", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "250000");
    await user.type(screen.getByLabelText(/Down Payment/i), "50000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "5.5");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  it("handles invalid interest rate input", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "300000");
    await user.type(screen.getByLabelText(/Down Payment/i), "60000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "101");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Interest rate must be between 0 and 100/i)
      ).toBeInTheDocument();
    });
  });

  it("validates required fields and shows error messages", async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Property price is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Down payment is required")).toBeInTheDocument();
      expect(screen.getByText("Interest rate is required")).toBeInTheDocument();
    });
  });

  it("formats currency values correctly", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "1000000");
    await user.type(screen.getByLabelText(/Down Payment/i), "200000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "4.5");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const propertyPriceElement = screen.getByTestId("property-price");
      const propertyDownPayment = screen.getByTestId("down-payment");

      expect(propertyPriceElement).toBeInTheDocument();
      expect(propertyDownPayment).toBeInTheDocument();

      expect(propertyPriceElement).toHaveValue("1,000,000");
      expect(propertyDownPayment).toHaveValue("200,000");
    });
  });

  it("displays an error when down payment exceeds property price", async () => {
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

    const paymentResult = screen.queryByTestId("payment-result");
    expect(paymentResult).not.toHaveTextContent(/\$1,500\.00/);
  });

  it("renders the PaymentResultCard with the correct payment value", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Property Price/i), "500000");
    await user.type(screen.getByLabelText(/Down Payment/i), "100000");
    await user.type(screen.getByLabelText(/Annual Interest Rate/i), "5");

    const submitButton = screen.getByRole("button", {
      name: /calculate payment/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("payment-result")).toBeInTheDocument();
      expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument();
    });
  });

  // it("displays an error when mortgage calculation fails", async () => {
  //   vi.mock("../../hooks/useCalculateMortgage/useCalculateMortgage", () => ({
  //     useCalculateMortgage: () => ({
  //       executeCalculateMortgage: vi
  //         .fn()
  //         .mockRejectedValue(new Error("Calculation failed")),
  //     }),
  //   }));

  //   const user = userEvent.setup();

  //   await user.type(screen.getByLabelText(/Property Price/i), "500000");
  //   await user.type(screen.getByLabelText(/Down Payment/i), "100000");
  //   await user.type(screen.getByLabelText(/Annual Interest Rate/i), "5");

  //   const submitButton = screen.getByRole("button", {
  //     name: /calculate payment/i,
  //   });
  //   await user.click(submitButton);

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(
  //         "An error occurred while calculating the payment. Details: Error: Calculation failed"
  //       )
  //     ).toBeInTheDocument();
  //   });

  //   const paymentResult = screen.queryByTestId("payment-result");
  //   expect(paymentResult).not.toBeInTheDocument();
  // });
});
