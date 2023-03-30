import { Fragment, useMemo } from "react";
import { TFields, FormFields, ISelectArea } from "./Fields";
import { IFieldArea, IFieldWrapperProps } from "./FieldWrapper";
import { Row100 } from "./FormRows";
import useImaginaryForm from "./useImaginaryForm";
import {
  IImaginaryUiComponents,
  ImaginaryUiProvider,
  useImaginaryUi,
} from "./useImaginaryUi";

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

const uiMaker = (components: FormFields): IImaginaryUiComponents => {
  const {
    Input,
    Select,
    fieldWrapperClassName,
    FieldLabel,
    FieldError,
    Button,
    SubmitButton,
  } = components;

  const TheFieldWrapper = ({
    id,
    label,
    children,
    description,
    errrorMessage,
  }: IFieldWrapperProps) => (
    <div className={fieldWrapperClassName.className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {description ? (
        <p
          id={`${id}-description`}
          className={fieldWrapperClassName.descClassName}
        >
          {description}
        </p>
      ) : null}
      <FieldError message={errrorMessage} />
    </div>
  );

  return {
    InputArea: (props: IFieldArea) => {
      const { setFieldValue, getFieldError } = useImaginaryForm();
      const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFieldValue(props.name, e.target.value);
      };
      const errrorMessage = getFieldError(props.name);
      return (
        <TheFieldWrapper {...props} errrorMessage={errrorMessage}>
          <Input {...props} onBlur={onBlur} />
        </TheFieldWrapper>
      );
    },
    SelectArea: (props: ISelectArea) => {
      const { setFieldValue, getFieldValue } = useImaginaryForm();
      const value = getFieldValue(props.name);
      const onChange = (newValue: string | number | undefined) => {
        setFieldValue(props.name, newValue);
      };
      return <Select {...props} onChange={onChange} value={value} />;
    },

    FormButton: Button,
    SubmitButton,
  };
};

const FormButtons = () => {
  const { currentStep, totalSteps, onBack } = useImaginaryForm();
  const { FormButton, SubmitButton } = useImaginaryUi();
  const { backBtnText, nextBtnText } = useMemo(() => {
    return {
      backBtnText: "Back",
      nextBtnText: currentStep === totalSteps ? "Save" : "Next",
    };
  }, []);

  // @ts-ignore
  const backHandler = (e) => {
    e.preventDefault();
    onBack();
  };
  return (
    <>
      {currentStep > 1 ? (
        <FormButton onClick={backHandler} text={backBtnText} />
      ) : null}
      <SubmitButton text={nextBtnText} />
    </>
  );
};

const Form = ({ components }: { components: FormFields }) => {
  const { InputArea, SelectArea, FormButton, SubmitButton } = useMemo(
    () => uiMaker(components),
    [components]
  );
  const { fields, onNext, isValidating, currentStep, hasErrors } =
    useImaginaryForm();
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };
  return (
    <>
      <ImaginaryUiProvider
        {...{
          InputArea,
          SelectArea,
          FormButton,
          SubmitButton,
        }}
      >
        <form
          className={`imaginary-form-${currentStep} ${
            isValidating ? "is-validating" : ""
          } ${hasErrors ? "has-error" : ""}}`}
          onSubmit={formHandler}
          key={`imaginary-form-${currentStep}`}
        >
          {fields.map((field) => {
            return (
              <Fragment key={field.id}>
                <Row100 field={field} />
              </Fragment>
            );
          })}
          <FormButtons />
        </form>
      </ImaginaryUiProvider>
    </>
  );
};

export default Form;
