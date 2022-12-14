import { createContext, useEffect, useState } from "react";
import { DataBank } from "../models";
import FullPageLoader from "../components/design/full-page-loader/full-page-loader.component";

interface DataBankContext {
  data: DataBank | null;
  sections: Array<string>;
}

export const DataBankContext = createContext<DataBankContext>({ data: null, sections: [] });

export function DataBankContextProvider(props: { children: React.ReactNode }): JSX.Element {
  const [context, setContext] = useState<DataBankContext>({ data: null, sections: [] });

  useEffect(() => {
    let isCanceled: boolean = false;
    // Loading the asset dynamically to allow Vite to split the chunks and to have a better time to start
    import("../assets/banca_dati.json").then((module: { default: DataBank }) => {
      if (!isCanceled) {
        setContext({
          data: module?.default ?? null,
          sections: module?.default.map((section) => section.section) || [],
        });
      }
    });
    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <DataBankContext.Provider value={context}>
      {props.children}
      <FullPageLoader show={!context.data} />
    </DataBankContext.Provider>
  );
}
