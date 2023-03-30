import { Fragment } from "react";
import { TFields } from "./Fields";
import { Row100 } from "./FormRows";
import useImaginaryForm, { ImaginaryFormProvider } from "./useImaginaryForm";

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
  // @ts-ignore
  const backHandler = (e) => {
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
