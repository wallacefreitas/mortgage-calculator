import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import request from "supertest";
import cors from "cors";
import { router } from "../../routes";

describe("Mortgage Calculator API Integration Tests", () => {
  const app = express();
  const port = 3002;
  let server: any;

  beforeAll(() => {
    app.use(express.json());
    app.use(cors());
    app.use("/api/v1", router);
    server = app.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("POST /api/v1/mortgage/calculate", () => {
    it("should calculate monthly mortgage payment successfully", async () => {
      const payload = {
        propertyPrice: 500000,
        downPayment: 100000,
        paymentSchedule: "monthly",
        interestRate: 5,
        amortizationPeriod: 25,
      };

      const response = await request(app)
        .post("/api/v1/mortgage/calculate")
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(typeof response.body.finalPayment).toBe("number");
    });

    it("should handle invalid payment schedule", async () => {
      const payload = {
        propertyPrice: 500000,
        downPayment: 100000,
        paymentSchedule: "invalid",
        interestRate: 5,
        amortizationPeriod: 25,
      };

      const response = await request(app)
        .post("/api/v1/mortgage/calculate")
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined();
    });

    it("should handle insufficient down payment", async () => {
      const payload = {
        propertyPrice: 500000,
        downPayment: 10000,
        paymentSchedule: "monthly",
        interestRate: 5,
        amortizationPeriod: 25,
      };

      const response = await request(app)
        .post("/api/v1/mortgage/calculate")
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined();
    });

    it("should calculate bi-weekly mortgage payment", async () => {
      const payload = {
        propertyPrice: 500000,
        downPayment: 100000,
        paymentSchedule: "bi-weekly",
        interestRate: 5,
        amortizationPeriod: 25,
      };

      const response = await request(app)
        .post("/api/v1/mortgage/calculate")
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(typeof response.body.finalPayment).toBe("number");
    });

    it("should calculate accelerated bi-weekly mortgage payment", async () => {
      const payload = {
        propertyPrice: 500000,
        downPayment: 100000,
        paymentSchedule: "accelerated-bi-weekly",
        interestRate: 5,
        amortizationPeriod: 25,
      };

      const response = await request(app)
        .post("/api/v1/mortgage/calculate")
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(typeof response.body.finalPayment).toBe("number");
    });
  });
});
