import { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    className: {
      control: "text",
    },
    children: {
      control: false,
    },
  },
  args: {
    className: "",
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can place any content here.</p>
      </CardContent>
      <CardFooter>
        <button className="btn-primary">Action</button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button.</CardDescription>
        <CardAction>
          <button className="btn-secondary">Action</button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can place any content here.</p>
      </CardContent>
      <CardFooter>
        <button className="btn-primary">Footer Action</button>
      </CardFooter>
    </Card>
  ),
};
