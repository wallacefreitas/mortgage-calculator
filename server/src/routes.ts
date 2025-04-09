import { Router, Request, Response } from "express";
import { calculateMortgageController } from "@application/use-cases/calculate-mortgage";

const router = Router();

router.post("/mortgage/calculate", (request: Request, response: Response) => {
  calculateMortgageController.handle(request, response);
});

export { router };
