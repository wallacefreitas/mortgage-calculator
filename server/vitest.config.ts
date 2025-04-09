import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      exclude: [
        "vitest.config.ts",
        "src/index.ts",
        "src/routes.ts",
        "src/core/abstract/**",
        "src/application/use-cases/calculate-mortgage/index.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@application": path.resolve(__dirname, "src/application"),
      "@core": path.resolve(__dirname, "src/core"),
      "@infra": path.resolve(__dirname, "src/infra"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
