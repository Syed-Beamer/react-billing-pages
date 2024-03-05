import data from "../data/pricing.json";

export interface PricingsType {
  changelog: string;
  nps: string;
  feedback: string;
}

export interface PlanType {
  plan: string;
  setCurrPlan: string;
  colour: string;
  annualPricing: number | null | undefined;
  monthlyPricing: number;
  offerMonthly: string;
  offerAnnually: string | null | undefined;
  featuresHead: string;
  features: string[];
}
export interface NPSType {
  plan: string;
  setCurrPlan: string;
  monthlyPricing: number;
  colour: string;
  offerMonthly: string;
  featuresHead: string;
  features: string[];
}

export interface PricingDataType {
  changelog: PlanType[];
  nps: NPSType[];
  feedback: PlanType[];
}

export type feature = keyof typeof data;
