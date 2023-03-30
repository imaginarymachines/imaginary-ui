import {
  FieldWrapper,
  IFieldArea,
  IFrieldWrapperClassNames,
} from "./FieldWrapper";
import useImaginaryForm from "./useImaginaryForm";

export interface FormFields {
  Input: React.FC<IInputProps>;
  Select: React.FC<ISelectProps>;
  fieldWrapperClassName: IFrieldWrapperClassNames;
  FieldLabel: React.FC<ILabelProps>;
  FieldError: React.FC<IFieldErrorProps>;
  Button: React.FC<IButton>;
  SubmitButton: React.FC<ISubmitButton>;
}

export type TFieldTypes = "input" | "select";

export interface IOption {
  value: string;
  label: string;
}
export type TOptions = IOption[];
export interface IField {
  id: string;
  type: string;
  fieldType?: TFieldTypes;
  defaultValue?: string;
  label: string;
  name: string;
  description?: string;
  link?: string;
  required?: boolean;
  rules?: string;
  options?: TOptions;
}
export type TFields = IField[];

export interface IButton {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ISubmitButton {
  text: string;
}

export interface IFieldErrorProps {
  message: string;
  className?: string;
}

export function InputError({
  message,
  className = "text-sm text-red-600 mt-2",
}: IFieldErrorProps) {
  return message ? <p className={className}>{message}</p> : null;
}

export interface IInputProps {
  type: string;
  className?: string;
  id: string;
  name: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
}

export interface ILabelProps {
  htmlFor: string;
  className?: string;
  children: string | React.ReactNode;
}

export function FieldLabel({ htmlFor, className = "", children }: ILabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
export interface ISelectProps {
  id: string;
  name: string;
  options: TOptions;
  onChange: (newValue: string | number | undefined) => void;
  value: string | number | undefined;
}
export const Select = ({
  id,
  name,
  options,
  onChange,
  value,
}: ISelectProps) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
export interface ISelectArea extends IFieldArea {
  onChange: (newValue: string | number | undefined) => void;
  options: TOptions;
}
export const SelectArea = ({
  label,
  name,
  id,
  description = "",
  options = [],
  errrorMessage = "",
}: ISelectArea) => {
  const { getFieldValue, setFieldValue } = useImaginaryForm();
  const value = getFieldValue(name);

  return (
    <FieldWrapper
      id={id}
      errrorMessage={errrorMessage}
      label={label}
      description={description}
    >
      <Select
        id={id}
        name={name}
        options={options}
        value={value}
        onChange={(newValue) => {
          setFieldValue(name, newValue);
        }}
      />
    </FieldWrapper>
  );
};

export const Input = ({
  type,
  className = "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
  id,
  name,
  onBlur,
  defaultValue,
}: IInputProps) => {
  return (
    <div className="flex flex-col items-start">
      <input
        type={type}
        className={className}
        id={id}
        name={name}
        defaultValue={defaultValue}
        onBlur={onBlur}
      />
    </div>
  );
};

export const InputArea = ({
  label,
  name,
  type,
  id,
  description,
  className,
}: IFieldArea) => {
  const { getFieldValue, setFieldValue, getFieldError } = useImaginaryForm();
  const errrorMessage = getFieldError(name);
  const onBlur = (e: any) => {
    setFieldValue(name, e.target.value);
  };
  return (
    <FieldWrapper
      id={id}
      label={label}
      errrorMessage={errrorMessage}
      description={description}
    >
      <>
        <Input
          type={type}
          className={className}
          id={id}
          name={name}
          defaultValue={getFieldValue(name)}
          onBlur={onBlur}
        />
      </>
    </FieldWrapper>
  );
};
