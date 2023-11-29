import create from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

export type User = "customer" | "staker" | "merchant" | "bank" | "undefined"

type TGlobalState = {
  userType: User,
  setUserType: (newVal: User) => void;
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  userType: "undefined",
  setUserType: (newVal: User): void => set(() => ({ userType: newVal })),
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
}));


