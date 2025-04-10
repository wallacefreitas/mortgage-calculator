import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

describe("Alert", () => {
  it("renders with default variant", () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(
      "relative",
      "w-full",
      "rounded-lg",
      "border",
      "px-4",
      "py-3",
      "text-sm",
      "bg-card",
      "text-card-foreground"
    );
  });

  it("renders with destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error Title</AlertTitle>
        <AlertDescription>Error Description</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("text-destructive", "bg-card");
  });

  it("renders AlertTitle with correct styles", () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
      </Alert>
    );

    const title = screen.getByText("Test Title");
    expect(title).toHaveClass(
      "col-start-2",
      "line-clamp-1",
      "min-h-4",
      "font-medium",
      "tracking-tight"
    );
    expect(title).toHaveAttribute("data-slot", "alert-title");
  });

  it("renders AlertDescription with correct styles", () => {
    render(
      <Alert>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    const description = screen.getByText("Test Description");
    expect(description).toHaveClass(
      "text-muted-foreground",
      "col-start-2",
      "grid",
      "justify-items-start",
      "gap-1",
      "text-sm"
    );
    expect(description).toHaveAttribute("data-slot", "alert-description");
  });

  it("applies custom className to Alert", () => {
    const customClass = "custom-alert";
    render(
      <Alert className={customClass}>
        <AlertTitle>Test Title</AlertTitle>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(customClass);
  });

  it("applies custom className to AlertTitle", () => {
    const customClass = "custom-title";
    render(
      <Alert>
        <AlertTitle className={customClass}>Test Title</AlertTitle>
      </Alert>
    );

    const title = screen.getByText("Test Title");
    expect(title).toHaveClass(customClass);
  });

  it("applies custom className to AlertDescription", () => {
    const customClass = "custom-description";
    render(
      <Alert>
        <AlertDescription className={customClass}>
          Test Description
        </AlertDescription>
      </Alert>
    );

    const description = screen.getByText("Test Description");
    expect(description).toHaveClass(customClass);
  });

  it("forwards additional props to Alert", () => {
    const testId = "test-alert";
    render(
      <Alert data-testid={testId}>
        <AlertTitle>Test Title</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("forwards additional props to AlertTitle", () => {
    const testId = "test-title";
    render(
      <Alert>
        <AlertTitle data-testid={testId}>Test Title</AlertTitle>
      </Alert>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("forwards additional props to AlertDescription", () => {
    const testId = "test-description";
    render(
      <Alert>
        <AlertDescription data-testid={testId}>
          Test Description
        </AlertDescription>
      </Alert>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("renders with data-slot attributes", () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "alert");
    expect(screen.getByText("Test Title")).toHaveAttribute(
      "data-slot",
      "alert-title"
    );
    expect(screen.getByText("Test Description")).toHaveAttribute(
      "data-slot",
      "alert-description"
    );
  });

  it("renders with grid layout when containing an icon", () => {
    render(
      <Alert>
        <svg data-testid="test-icon" />
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(
      "has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]"
    );
  });
});
