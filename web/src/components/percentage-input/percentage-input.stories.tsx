import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import PercentageInput, { PercentageInputProps } from "./percentage-input";

const meta: Meta<typeof PercentageInput> = {
  title: "Components/PercentageInput",
  component: PercentageInput,
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
    placeholder: {
      control: "text",
      description: "The placeholder text for the input field.",
    },
    onChange: {
      action: "changed",
      description: "Callback function triggered when the input value changes.",
    },
  },
  args: {
    id: "percentage-input",
    label: "Interest Rate",
    value: "",
    placeholder: "Enter percentage",
  },
};

export default meta;

type Story = StoryObj<typeof PercentageInput>;

export const Default: Story = {
  render: (args) => <DefaultWrapper {...args} />,
};

const DefaultWrapper: React.FC<PercentageInputProps> = (args) => {
  const [value, setValue] = useState("");

  return (
    <PercentageInput
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithInitialValue: Story = {
  render: (args) => <WithInitialValueWrapper {...args} />,
};

const WithInitialValueWrapper: React.FC<PercentageInputProps> = (args) => {
  const [value, setValue] = useState("5.5");

  return (
    <PercentageInput
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};
