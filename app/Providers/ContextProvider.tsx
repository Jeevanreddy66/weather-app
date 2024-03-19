"use client";

import { GlobalContextProvider } from "../context/globalContext";

const ContextProvider = ({ children }: any) => {
  return (
    <>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </>
  );
};

export default ContextProvider;
