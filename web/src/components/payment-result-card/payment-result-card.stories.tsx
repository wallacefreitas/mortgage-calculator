import { Meta, StoryObj } from "@storybook/react";
import PaymentResultCard from "./payment-result-card";

const meta: Meta<typeof PaymentResultCard> = {
  title: "Components/PaymentResultCard",
  component: PaymentResultCard,
  argTypes: {
    paymentSchedule: {
      control: "select",
      options: ["monthly", "bi-weekly", "accelerated-bi-weekly"],
      description: "The payment schedule type.",
    },
    payment: {
      control: "number",
      description: "The payment amount to display.",
    },
  },
  args: {
    paymentSchedule: "monthly",
    payment: 1500,
  },
};

export default meta;

type Story = StoryObj<typeof PaymentResultCard>;

export const MonthlyPayment: Story = {
  args: {
    paymentSchedule: "monthly",
    payment: 1500,
  },
};

export const BiWeeklyPayment: Story = {
  args: {
    paymentSchedule: "bi-weekly",
    payment: 750,
  },
};

export const AcceleratedBiWeeklyPayment: Story = {
  args: {
    paymentSchedule: "accelerated-bi-weekly",
    payment: 800,
  },
};
