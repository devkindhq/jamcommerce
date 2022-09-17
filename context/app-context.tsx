import { createContext } from "react";
import { IAppProviderState } from "../providers/app-provider";

type AppContext = {
    state: IAppProviderState,
    changeCurrency: (code: string) => void
}
const AppContext = createContext<AppContext>();

export default AppContext;
