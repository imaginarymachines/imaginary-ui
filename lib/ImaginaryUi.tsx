import { createContext,useContext } from "react";
import { IFieldArea,  } from "./Fields";

export interface IImaginaryUiComponents {
    SelectArea: React.FC<IFieldArea>,
    InputArea: React.FC<IFieldArea>,
}
//context that holds components
export const ImaginaryUiContext = createContext<IImaginaryUiComponents>(
    // @ts-ignore
    null
)

interface IImaginaryUiProvider extends IImaginaryUiComponents {
    children: React.ReactNode,
}

//Provider for ImaginaryUiContext
export const ImaginaryUiProvider = ({ children, InputArea,SelectArea}: IImaginaryUiProvider) => {
    return (
        <ImaginaryUiContext.Provider value={{
            InputArea,
            SelectArea
        }}>
            {children}
        </ImaginaryUiContext.Provider>
    );
}

export const useImaginaryUi = () => {
    const context = useContext(ImaginaryUiContext);
    if (context === undefined) {
        throw new Error('useImaginaryUi must be used within a ImaginaryUiProvider');
    }
    return context;
}
