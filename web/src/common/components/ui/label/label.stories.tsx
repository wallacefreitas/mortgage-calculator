import { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  argTypes: {
    htmlFor: {
      control: "text",
    },
    children: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
  args: {
    htmlFor: "input-id",
    children: "Label Text",
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: "text-primary font-bold",
    children: "Custom Styled Label",
  },
};
