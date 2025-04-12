import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "shadow-xs",
      "hover:bg-primary/90",
      "h-9",
      "px-4",
      "py-2"
    );
  });

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass(
      "bg-destructive",
      "text-white",
      "shadow-xs",
      "hover:bg-destructive/90"
    );
  });

  it("renders with small size", () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole("button", { name: "Small" });
    expect(button).toHaveClass("h-8", "rounded-md", "gap-1.5", "px-3");
  });

  it("renders with large size", () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole("button", { name: "Large" });
    expect(button).toHaveClass("h-10", "rounded-md", "px-6");
  });

  it("renders with icon size", () => {
    render(<Button size="icon">Icon</Button>);

    const button = screen.getByRole("button", { name: "Icon" });
    expect(button).toHaveClass("size-9");
  });

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<Button className={customClass}>Custom</Button>);

    const button = screen.getByRole("button", { name: "Custom" });
    expect(button).toHaveClass(customClass);
  });

  it("renders with disabled state", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50"
    );
  });

  it("renders with data-slot attribute", () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("forwards additional props", () => {
    const onClick = () => {};
    const testId = "test-button";

    render(
      <Button onClick={onClick} data-testid={testId}>
        Click me
      </Button>
    );

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
  });
});
