import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./select";
import userEvent from "@testing-library/user-event";

describe("Select Components", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  describe("SelectItem", () => {
    it("calls onSelect when the item is clicked", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Select onValueChange={onSelect}>
          <SelectTrigger>Open</SelectTrigger>
          <SelectContent>
            <SelectItem value="item-1">Item 1</SelectItem>
          </SelectContent>
        </Select>
      );

      await user.click(screen.getByText("Open"));
      await user.click(screen.getByText("Item 1"));

      expect(onSelect).toHaveBeenCalledWith("item-1");
    });

    it("renders the check icon when the item is selected", async () => {
      const user = userEvent.setup();

      render(
        <Select defaultValue="item-1">
          <SelectTrigger>Open</SelectTrigger>
          <SelectContent>
            <SelectItem value="item-1">Item 1</SelectItem>
            <SelectItem value="item-2">Item 2</SelectItem>
          </SelectContent>
        </Select>
      );

      await user.click(screen.getByText("Open"));

      const selectedItem = screen.getByText("Item 1").closest("div");
      expect(selectedItem).toHaveAttribute("data-state", "checked");
      expect(selectedItem?.querySelector("svg")).toBeInTheDocument();
    });
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
