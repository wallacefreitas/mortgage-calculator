import "@testing-library/jest-dom";
import { afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";

beforeAll(() => {
  Element.prototype.setPointerCapture =
    Element.prototype.setPointerCapture || (() => {});
  Element.prototype.hasPointerCapture =
    Element.prototype.hasPointerCapture || (() => false);
  Element.prototype.releasePointerCapture =
    Element.prototype.releasePointerCapture || (() => {});
});

afterEach(() => {
  cleanup();
});
