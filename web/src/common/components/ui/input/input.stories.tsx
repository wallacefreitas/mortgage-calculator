import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    className: {
      control: "text",
    },
  },
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Custom placeholder",
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};
