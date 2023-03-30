import { createContext, useContext } from "react";
import { IButton, ISubmitButton } from "./Fields";
import { IFieldArea } from "./FieldWrapper";

export interface IImaginaryUiComponents {
  SelectArea: React.FC<IFieldArea>;
  InputArea: React.FC<IFieldArea>;
  FormButton: React.FC<IButton>;
  SubmitButton: React.FC<ISubmitButton>;
}
//context that holds components
export const ImaginaryUiContext = createContext<IImaginaryUiComponents>(
  // @ts-ignore
  null
);

interface IImaginaryUiProvider extends IImaginaryUiComponents {
  children: React.ReactNode;
}

//Provider for ImaginaryUiContext
export const ImaginaryUiProvider = ({
  children,
  InputArea,
  SelectArea,
  FormButton,
  SubmitButton,
}: IImaginaryUiProvider) => {
  return (
    <ImaginaryUiContext.Provider
      value={{
        InputArea,
        SelectArea,
        FormButton,
        SubmitButton,
      }}
    >
      {children}
    </ImaginaryUiContext.Provider>
  );
};

export const useImaginaryUi = () => {
  const context = useContext(ImaginaryUiContext);
  if (context === undefined) {
    throw new Error("useImaginaryUi must be used within a ImaginaryUiProvider");
  }
  return context;
};
