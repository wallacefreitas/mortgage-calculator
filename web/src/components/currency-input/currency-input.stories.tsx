import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import CurrencyInput from "./currency-input";

const meta: Meta<typeof CurrencyInput> = {
  title: "Components/CurrencyInput",
  component: CurrencyInput,
  argTypes: {
    id: {
      control: "text",
      description: "The unique identifier for the input field.",
    },
    label: {
      control: "text",
      description: "The label for the input field.",
    },
    value: {
      control: "text",
      description: "The current value of the input field.",
    },
    onChange: {
      action: "changed",
      description: "Callback function triggered when the input value changes.",
    },
  },
  args: {
    id: "currency-input",
    label: "Property Price",
    value: "",
  },
};

export default meta;

type Story = StoryObj<typeof CurrencyInput>;

export const Default: Story = {
  render: (args) => {
    const DefaultComponent: React.FC = () => {
      const [value, setValue] = useState("");

      return (
        <CurrencyInput
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    return <DefaultComponent />;
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const WithInitialValueComponent: React.FC = () => {
      const [value, setValue] = useState("100000");

      return (
        <CurrencyInput
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    return <WithInitialValueComponent />;
  },
};
