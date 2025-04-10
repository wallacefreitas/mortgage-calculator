import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders with default styles", () => {
    render(<Label>Test Label</Label>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
      "text-sm",
      "leading-none",
      "font-medium",
      "select-none"
    );
  });

  it("renders with custom className", () => {
    const customClass = "custom-class";
    render(<Label className={customClass}>Test Label</Label>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass(customClass);
  });

  it("applies disabled styles when group is disabled", () => {
    render(
      <div data-disabled="true">
        <Label>Test Label</Label>
      </div>
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass(
      "group-data-[disabled=true]:pointer-events-none",
      "group-data-[disabled=true]:opacity-50"
    );
  });

  it("applies disabled styles when peer is disabled", () => {
    render(
      <div>
        <input disabled />
        <Label>Test Label</Label>
      </div>
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass(
      "peer-disabled:cursor-not-allowed",
      "peer-disabled:opacity-50"
    );
  });

  it("renders with data-slot attribute", () => {
    render(<Label>Test Label</Label>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("data-slot", "label");
  });

  it("forwards additional props", () => {
    const testId = "test-label";
    render(<Label data-testid={testId}>Test Label</Label>);

    const label = screen.getByTestId(testId);
    expect(label).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const childText = "Label with child";
    render(
      <Label>
        <span>{childText}</span>
      </Label>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("maintains accessibility attributes", () => {
    const htmlFor = "input-id";
    render(<Label htmlFor={htmlFor}>Test Label</Label>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", htmlFor);
  });
});
