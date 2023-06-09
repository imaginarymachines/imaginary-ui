import { createContext, useContext } from "react";
import { IButton, ISelectArea, ISubmitButton } from "./Fields";
import { IFieldArea } from "./FieldWrapper";

export interface IImaginaryUiComponents {
  InputArea: React.FC<IFieldArea>;
  SelectArea: React.FC<ISelectArea>;
  FormButton: React.FC<IButton>;
  SubmitButton: React.FC<ISubmitButton>;
  FormButtonWrap: React.FC<{
    children: React.ReactNode;
  }>;
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
  FormButtonWrap,
}: IImaginaryUiProvider) => {
  return (
    <ImaginaryUiContext.Provider
      value={{
        InputArea,
        SelectArea,
        FormButton,
        SubmitButton,
        FormButtonWrap,
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
