import { Fragment, memo, useCallback, useMemo, useState } from "react";
import { IField, InputArea, SelectArea, TFields } from "./Fields";
import { Row100 } from "./FormRows";
import { Breadcrumbs } from "./Navigation";
import useImaginaryForm, { ImaginaryFormProvider } from "./useImaginaryForm";

const FormBreadCrumbs = () => {
  const { groupNav, goToStep } = useImaginaryForm();
  return (
    <Breadcrumbs
      links={groupNav}
      onClick={(clicked: any) => {
        goToStep(clicked.step);
      }}
    />
  );
};

const getFieldById = (layout: ILayout, fieldId: string) => {
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
  fields: TFields;
  groups: TGroups;
  id: string;
  label: string;
}

const Form = () => {
  const { fields, onNext, onBack } = useImaginaryForm();
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };
  const backHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onBack();
  };
  return (
    <>
      <form onSubmit={formHandler}>
        {fields.map((field) => {
          return (
            <Fragment key={field.id}>
              <Row100 field={field} />
            </Fragment>
          );
        })}
        <button onClick={backHandler}>Back</button>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Form;
