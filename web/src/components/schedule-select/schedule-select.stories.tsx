import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ScheduleSelect from "./schedule-select";

const meta: Meta<typeof ScheduleSelect> = {
  title: "Components/ScheduleSelect",
  component: ScheduleSelect,
  argTypes: {
    value: {
      control: "text",
      description: "The currently selected payment schedule.",
    },
    onChange: {
      action: "changed",
      description:
        "Callback function triggered when the selected value changes.",
    },
  },
  args: {
    value: "",
  },
};

export default meta;

type Story = StoryObj<typeof ScheduleSelect>;

export const Default: Story = {
  render: (args) => {
    const Component = () => {
      const [value, setValue] = useState("");

      return (
        <ScheduleSelect
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    return <Component />;
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const Component = () => {
      const [value, setValue] = useState("monthly");

      return (
        <ScheduleSelect
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    return <Component />;
  },
};
