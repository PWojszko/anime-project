import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

type RWDType = {
  sm: { matches: boolean };
  md: { matches: boolean };
  lg: { matches: boolean };
};

export const RWDContext = createContext<RWDType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const RWDContextProvider = ({ children }: Props) => {
  const [sm, setSm] = useState({
    matches: window.matchMedia("(min-width: 768px)").matches,
  });
  const [md, setMd] = useState({
    matches: window.matchMedia("(min-width: 1024px)").matches,
  });
  const [lg, setLg] = useState({
    matches: window.matchMedia("(min-width: 1200px)").matches,
  });

  useEffect(() => {
    const changeHandler = (e: { matches: boolean }) =>
      setSm({ matches: e.matches });

    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", changeHandler);
  }, []);

  useEffect(() => {
    const changeHandler = (e: { matches: boolean }) =>
      setMd({ matches: e.matches });

    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", changeHandler);
  }, []);

  useEffect(() => {
    const changeHandler = (e: { matches: boolean }) =>
      setLg({ matches: e.matches });

    window
      .matchMedia("(min-width: 1200px)")
      .addEventListener("change", changeHandler);
  }, []);

  return (
    <RWDContext.Provider
      value={{
        sm,
        md,
        lg,
      }}
    >
      {children}
    </RWDContext.Provider>
  );
};

export const useRWDContext = () => {
  const context = useContext(RWDContext);

  if (context === undefined) {
    throw new Error("");
  }

  return context;
};

export default RWDContextProvider;
