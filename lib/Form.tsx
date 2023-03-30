import { Fragment, useMemo } from "react";
import { TFields } from "./Fields";
import { Row100 } from "./FormRows";
import useImaginaryForm from "./useImaginaryForm";
import { useImaginaryUi } from "./useImaginaryUi";

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
  const { fields, onNext, onBack, currentStep, totalSteps } =
    useImaginaryForm();
  const { FormButton, SubmitButton } = useImaginaryUi();
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };
  // @ts-ignore
  const backHandler = (e) => {
    e.preventDefault();
    onBack();
  };
  const { backBtnText, nextBtnText } = useMemo(() => {
    return {
      backBtnText: "Back",
      nextBtnText: currentStep === totalSteps ? "Save" : "Next",
    };
  }, []);
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
        {currentStep > 1 ? (
          <FormButton onClick={backHandler} text={backBtnText} />
        ) : null}
        <SubmitButton text={nextBtnText} />
      </form>
    </>
  );
};

export default Form;
