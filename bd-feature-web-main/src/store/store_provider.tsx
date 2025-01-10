"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "./store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<AppStore>();

  if (!ref.current) {
    ref.current = makeStore();
  }

  return <Provider store={ref.current}>{children}</Provider>;
};

export default StoreProvider;
