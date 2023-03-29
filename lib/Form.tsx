import { Fragment,  useCallback,  useMemo, useState,  } from 'react';
import { InputArea, TFields } from './Fields';
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
    const {fields,setFieldValue,values,onNext,onBack} = useImaginaryForm();
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
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <select
                    value={values[field.name]}
                    onChange={(e) => {
                      setFieldValue(field.name,e.target.value);
                    }}
                    id={field.id}
                    name={field.name}
                  >
                    {field.options ?field.options.map((option) => {
                      return (
                        <option key={option.value}value={option.value}>{option.label}</option>
                      )
                    }) : null}
                  </select>
                </div>
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
