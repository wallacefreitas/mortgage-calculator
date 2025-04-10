import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.spec.tsx"],
    coverage: {
      include: ["src/**/*.tsx"],
      exclude: ["src/App.tsx", "src/main.tsx"],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
  },
});
