import { CMHCPremium } from "@core/abstract/cmhc-premium.abstract";

interface PremiumRate {
  minDownPayment: number;
  rate: number;
}

enum DOWN_PAYMENT_TIERS {
  HIGH = 20,
  MEDIUM = 15,
  LOW = 10,
  MINIMUM = 0,
}

enum PREMIUM_RATES {
  NONE = 0,
  MEDIUM = 0.028,
  HIGH = 0.031,
  VERY_HIGH = 0.04,
}

export class CMHCPremiumService implements CMHCPremium {
  private readonly PREMIUM_RATE_TABLE: PremiumRate[] = [
    {
      minDownPayment: DOWN_PAYMENT_TIERS.HIGH,
      rate: PREMIUM_RATES.NONE,
    },
    {
      minDownPayment: DOWN_PAYMENT_TIERS.MEDIUM,
      rate: PREMIUM_RATES.MEDIUM,
    },
    {
      minDownPayment: DOWN_PAYMENT_TIERS.LOW,
      rate: PREMIUM_RATES.HIGH,
    },
    {
      minDownPayment: DOWN_PAYMENT_TIERS.MINIMUM,
      rate: PREMIUM_RATES.VERY_HIGH,
    },
  ];

  public calculate(propertyPrice: number, downPayment: number): number {
    const downPaymentPercentage = this.calculateDownPaymentPercentage(
      propertyPrice,
      downPayment
    );

    return this.getPremiumRate(downPaymentPercentage);
  }

  private calculateDownPaymentPercentage(
    propertyPrice: number,
    downPayment: number
  ): number {
    return (downPayment / propertyPrice) * 100;
  }

  private getPremiumRate(downPaymentPercentage: number): number {
    const premiumRate = this.PREMIUM_RATE_TABLE.find(
      (rate) => downPaymentPercentage >= rate.minDownPayment
    );

    return premiumRate?.rate ?? PREMIUM_RATES.VERY_HIGH;
  }
}
