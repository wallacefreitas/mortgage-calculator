import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import PeriodSelect from "./period-select";

const meta: Meta<typeof PeriodSelect> = {
  title: "Components/PeriodSelect",
  component: PeriodSelect,
  argTypes: {
    id: {
      control: "text",
      description: "The unique identifier for the select field.",
    },
    value: {
      control: "text",
      description: "The currently selected value.",
    },
    onChange: {
      action: "changed",
      description:
        "Callback function triggered when the selected value changes.",
    },
  },
  args: {
    id: "amortization-period",
    value: "",
  },
};

export default meta;

type Story = StoryObj<typeof PeriodSelect>;

export const Default: Story = {
  render: (args) => {
    const DefaultComponent: React.FC<typeof args> = (props) => {
      const [value, setValue] = useState("");

      return (
        <PeriodSelect
          {...props}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    return <DefaultComponent {...args} />;
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const WithInitialValueComponent: React.FC<typeof args> = (props) => {
      const [value, setValue] = useState("15");

      return (
        <PeriodSelect
          {...props}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    return <WithInitialValueComponent {...args} />;
  },
};
