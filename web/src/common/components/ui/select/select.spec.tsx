import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select, SelectTrigger, SelectValue } from "./select";

describe("Select Components", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  describe("SelectTrigger", () => {
    it("renders with default size", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue>Test</SelectValue>
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("data-size", "default");
    });

    it("renders with small size", () => {
      render(
        <Select>
          <SelectTrigger size="sm">
            <SelectValue>Test</SelectValue>
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("data-size", "sm");
    });
  });
});
