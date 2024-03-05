import React, { createContext, useContext, useReducer } from "react";
import pricingData from "@/data/pricing.json";
import { PricingsType, PricingDataType } from "@/types/pricing";

interface PricingStateType {
  showMonthlyPricing: boolean;
  currentPlan: PricingsType;
  selectedProduct: "changelog" | "nps" | "feedback";
  data: PricingDataType | any;
}

interface PricingReducerType {
  setProduct: (product: string) => void;
  setPricingType: (product: boolean) => void;
  setCurrentPricing: (product: string) => void;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initialData: PricingStateType = {
  showMonthlyPricing: true,
  selectedProduct: "changelog",
  currentPlan: {
    changelog: "scale",
    nps: "PRO",
    feedback: "FREE",
  },
  data: pricingData,
};

const initialReducers = {
  setProduct: () => {},
  setPricingType: () => {},
  setCurrentPricing: () => {},
};

const PricingStateContext = createContext(initialData);
const PricingReducerContext =
  createContext<PricingReducerType>(initialReducers);

const pricingReducer = (
  state: PricingStateType,
  action: ActionType
): PricingStateType => {
  const { payload, type } = action;

  switch (type) {
    case "set-pricing-type":
      return {
        ...state,
        showMonthlyPricing: payload,
      };
    case "set-product":
      return {
        ...state,
        selectedProduct: payload.product,
      };
    case "set-current-pricing":
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          [state.selectedProduct]: payload.planValue,
        },
      };
    default:
      return state;
  }
};

const PricingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(pricingReducer, initialData);

  const setProduct = (product: string): void => {
    dispatch({
      type: "set-product",
      payload: {
        product,
      },
    });
  };

  const setPricingType = (pricingType: Boolean): void => {
    dispatch({
      type: "set-pricing-type",
      payload: pricingType,
    });
  };
  const setCurrentPricing = (planValue: string): void => {
    dispatch({
      type: "set-current-pricing",
      payload: {
        planValue,
      },
    });
  };

  return (
    <PricingStateContext.Provider value={{ ...state }}>
      <PricingReducerContext.Provider
        value={{ setProduct, setPricingType, setCurrentPricing }}
      >
        {children}
      </PricingReducerContext.Provider>
    </PricingStateContext.Provider>
  );
};

export const usePricingState = () => useContext(PricingStateContext);
export const usePricingReducer = () => useContext(PricingReducerContext);
export default PricingProvider;
