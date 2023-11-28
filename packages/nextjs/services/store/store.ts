import create from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TGlobalState = {
  userType: "User" | "Staker" | "Merchant" | "Bank" | "Undefined",
  setUserType: (newVal: "User" | "Staker" | "Merchant" | "Bank") => void;
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  userType: "Undefined",
  setUserType: (newVal: "User" | "Staker" | "Merchant" | "Bank"): void => set(() => ({ userType: newVal })),
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
}));
