import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders with default styles", () => {
      render(<Card>Card Content</Card>);

      const card = screen.getByText("Card Content");
      expect(card).toHaveClass(
        "bg-card",
        "text-card-foreground",
        "flex",
        "flex-col",
        "gap-6",
        "rounded-xl",
        "border",
        "py-6",
        "shadow-sm"
      );
    });

    it("applies custom className", () => {
      const customClass = "custom-card";
      render(<Card className={customClass}>Card Content</Card>);

      const card = screen.getByText("Card Content");
      expect(card).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<Card>Card Content</Card>);

      const card = screen.getByText("Card Content");
      expect(card).toHaveAttribute("data-slot", "card");
    });
  });

  describe("CardHeader", () => {
    it("renders with default styles", () => {
      render(<CardHeader>Header Content</CardHeader>);

      const header = screen.getByText("Header Content");
      expect(header).toHaveClass(
        "@container/card-header",
        "grid",
        "auto-rows-min",
        "grid-rows-[auto_auto]",
        "items-start",
        "gap-1.5",
        "px-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:pb-6"
      );
    });

    it("applies custom className", () => {
      const customClass = "custom-header";
      render(<CardHeader className={customClass}>Header Content</CardHeader>);

      const header = screen.getByText("Header Content");
      expect(header).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<CardHeader>Header Content</CardHeader>);

      const header = screen.getByText("Header Content");
      expect(header).toHaveAttribute("data-slot", "card-header");
    });
  });

  describe("CardTitle", () => {
    it("renders with default styles", () => {
      render(<CardTitle>Card Title</CardTitle>);

      const title = screen.getByText("Card Title");
      expect(title).toHaveClass("leading-none", "font-semibold");
    });

    it("applies custom className", () => {
      const customClass = "custom-title";
      render(<CardTitle className={customClass}>Card Title</CardTitle>);

      const title = screen.getByText("Card Title");
      expect(title).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<CardTitle>Card Title</CardTitle>);

      const title = screen.getByText("Card Title");
      expect(title).toHaveAttribute("data-slot", "card-title");
    });
  });

  describe("CardDescription", () => {
    it("renders with default styles", () => {
      render(<CardDescription>Card Description</CardDescription>);

      const description = screen.getByText("Card Description");
      expect(description).toHaveClass("text-muted-foreground", "text-sm");
    });

    it("applies custom className", () => {
      const customClass = "custom-description";
      render(
        <CardDescription className={customClass}>
          Card Description
        </CardDescription>
      );

      const description = screen.getByText("Card Description");
      expect(description).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<CardDescription>Card Description</CardDescription>);

      const description = screen.getByText("Card Description");
      expect(description).toHaveAttribute("data-slot", "card-description");
    });
  });

  describe("CardAction", () => {
    it("renders with default styles", () => {
      render(<CardAction>Action Content</CardAction>);

      const action = screen.getByText("Action Content");
      expect(action).toHaveClass(
        "col-start-2",
        "row-span-2",
        "row-start-1",
        "self-start",
        "justify-self-end"
      );
    });

    it("applies custom className", () => {
      const customClass = "custom-action";
      render(<CardAction className={customClass}>Action Content</CardAction>);

      const action = screen.getByText("Action Content");
      expect(action).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<CardAction>Action Content</CardAction>);

      const action = screen.getByText("Action Content");
      expect(action).toHaveAttribute("data-slot", "card-action");
    });
  });

  describe("CardContent", () => {
    it("renders with default styles", () => {
      render(<CardContent>Content</CardContent>);

      const content = screen.getByText("Content");
      expect(content).toHaveClass("px-6");
    });

    it("applies custom className", () => {
      const customClass = "custom-content";
      render(<CardContent className={customClass}>Content</CardContent>);

      const content = screen.getByText("Content");
      expect(content).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<CardContent>Content</CardContent>);

      const content = screen.getByText("Content");
      expect(content).toHaveAttribute("data-slot", "card-content");
    });
  });

  describe("CardFooter", () => {
    it("renders with default styles", () => {
      render(<CardFooter>Footer Content</CardFooter>);

      const footer = screen.getByText("Footer Content");
      expect(footer).toHaveClass(
        "flex",
        "items-center",
        "px-6",
        "[.border-t]:pt-6"
      );
    });

    it("applies custom className", () => {
      const customClass = "custom-footer";
      render(<CardFooter className={customClass}>Footer Content</CardFooter>);

      const footer = screen.getByText("Footer Content");
      expect(footer).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(<CardFooter>Footer Content</CardFooter>);

      const footer = screen.getByText("Footer Content");
      expect(footer).toHaveAttribute("data-slot", "card-footer");
    });
  });

  it("renders a complete card with all components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );

    expect(screen.getByText("Complete Card")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});
