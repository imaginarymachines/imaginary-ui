import { Fragment,  useCallback,  useMemo, useState,  } from 'react';
import { InputArea, SelectArea, TFields } from './Fields';
import { Breadcrumbs, ImaginaryRow } from './Ui';
import useImaginaryForm, { ImaginaryFormProvider } from './useImaginaryForm';



const FormBreadCrumbs = () => {
    const { groupNav, goToStep } = useImaginaryForm();
    return (
        <Breadcrumbs links={groupNav} onClick={(clicked:any) => {
            goToStep(clicked.step);
        }} />
    );
}

const getFieldById = (layout:ILayout,fieldId:string) => {
    return layout.fields.find((field) => {
        return field.id === fieldId;
    });
};

export interface IGroup {
    id: string;
    label: string;
    description?: string;
    link?: string;
    order: number;
    //names of fields in this group
    fields: string[];
}
export type TGroups = IGroup[];
export interface ILayout {
    fields: TFields,
    groups: TGroups,
    id: string,
    label: string,
}

const Form = () => {
    const {fields,onNext,onBack} = useImaginaryForm();
    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onNext();
    }
    const backHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onBack();
    }
    return (
      <>
        <form onSubmit={formHandler}>
          {fields.map((field) => {
            if( 'select' === field.fieldType ) {
              return (
                <Fragment key={field.id}>
                <SelectArea {...field} />
              </Fragment>
              )
            }
            return (
              <Fragment key={field.id}>
                <InputArea {...field} />
              </Fragment>
            )
          })}
          <button onClick={backHandler}>Back</button>
          <input type="submit" value="Submit" />
          </form>
       </>
    );

  }

export default Form;
