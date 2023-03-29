import { createContext, useState, useMemo, useContext } from "react";
import Form, { ILayout } from "./Form";
import { ImaginaryFormProvider } from "./useImaginaryForm";
import { TValuesObj } from "./utils";


export default function ImaginaryForm({layout,onSave}:{
    layout:ILayout,
    onSave: (values: TValuesObj) => void,
}) {

    return (
        <>
          <ImaginaryFormProvider layout={layout} onSave={onSave}>
            <Form />
          </ImaginaryFormProvider>
        </>
      );
}
