import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form";

type TestFormProps = React.FC<{
  children: React.ReactNode;
  defaultValues?: Record<string, unknown>;
}>;

const TestForm: TestFormProps = ({ children, defaultValues = {} }) => {
  const form = useForm({ defaultValues });
  return <FormProvider {...form}>{children}</FormProvider>;
};

describe("Form Components", () => {
  describe("FormField", () => {
    it("provides field context to children", () => {
      const TestComponent = () => {
        return (
          <TestForm>
            <FormField
              name="test"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Field</FormLabel>
                  <FormControl>
                    <input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </TestForm>
        );
      };

      render(<TestComponent />);
      expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
    });
  });

  describe("FormItem", () => {
    it("renders with default styles", () => {
      render(
        <TestForm>
          <FormItem>Test Item</FormItem>
        </TestForm>
      );

      const item = screen.getByText("Test Item");
      expect(item).toHaveClass("grid", "gap-2");
    });

    it("applies custom className", () => {
      const customClass = "custom-item";
      render(
        <TestForm>
          <FormItem className={customClass}>Test Item</FormItem>
        </TestForm>
      );

      const item = screen.getByText("Test Item");
      expect(item).toHaveClass(customClass);
    });

    it("renders with data-slot attribute", () => {
      render(
        <TestForm>
          <FormItem>Test Item</FormItem>
        </TestForm>
      );

      const item = screen.getByText("Test Item");
      expect(item).toHaveAttribute("data-slot", "form-item");
    });
  });

  describe("FormLabel", () => {
    it("renders with default styles", () => {
      render(
        <TestForm>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormLabel>Test Label</FormLabel>
              </FormItem>
            )}
          />
        </TestForm>
      );

      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("data-slot", "form-label");
    });

    it("shows error state", async () => {
      const TestComponent = () => {
        const form = useForm({
          defaultValues: { test: "" },
        });

        return (
          <FormProvider {...form}>
            <FormField
              name="test"
              render={() => (
                <FormItem>
                  <FormLabel>Test Label</FormLabel>
                </FormItem>
              )}
            />
          </FormProvider>
        );
      };

      render(<TestComponent />);
      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("data-error", "false");
    });
  });

  describe("FormControl", () => {
    it("renders with proper aria attributes", () => {
      render(
        <TestForm>
          <FormField
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </TestForm>
      );

      const control = screen.getByRole("textbox");
      expect(control).toHaveAttribute("data-slot", "form-control");
      expect(control).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("FormDescription", () => {
    it("renders with default styles", () => {
      render(
        <TestForm>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormDescription>Help text</FormDescription>
              </FormItem>
            )}
          />
        </TestForm>
      );

      const description = screen.getByText("Help text");
      expect(description).toHaveClass("text-muted-foreground", "text-sm");
      expect(description).toHaveAttribute("data-slot", "form-description");
    });
  });

  describe("FormMessage", () => {
    it("renders error message when present", () => {
      const TestComponent = () => {
        const form = useForm({
          defaultValues: { test: "" },
        });

        return (
          <FormProvider {...form}>
            <FormField
              name="test"
              render={() => (
                <FormItem>
                  <FormMessage>Error message</FormMessage>
                </FormItem>
              )}
            />
          </FormProvider>
        );
      };

      render(<TestComponent />);
      const message = screen.getByText("Error message");
      expect(message).toHaveClass("text-destructive", "text-sm");
      expect(message).toHaveAttribute("data-slot", "form-message");
    });

    it("does not render when no error or children", () => {
      render(
        <TestForm>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </TestForm>
      );

      const message = screen.queryByRole("paragraph");
      expect(message).not.toBeInTheDocument();
    });
  });

  it("integrates all form components together", () => {
    const TestComponent = () => {
      const form = useForm({
        defaultValues: { test: "" },
      });

      return (
        <FormProvider {...form}>
          <FormField
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Field</FormLabel>
                <FormControl>
                  <input {...field} />
                </FormControl>
                <FormDescription>Help text</FormDescription>
                <FormMessage>Error message</FormMessage>
              </FormItem>
            )}
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
    expect(screen.getByText("Help text")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});
