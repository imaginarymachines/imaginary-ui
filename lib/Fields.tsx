import { useEffect, useRef } from "react";
import { FieldWrapper, IFieldArea } from "./FieldWrapper";
import useImaginaryForm from "./useImaginaryForm";

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
  options?: TOptions;
  rules?: string;
}
export type TFields = IField[];

export interface IButton {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ISubmitButton {
  text: string;
}

export function InputError({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return message ? (
    <p className={"text-sm text-red-600 " + className}>{message}</p>
  ) : null;
}

export function InputLabel({
  value,
  htmlFor,
  className = "",
  children,
}: {
  value: string;
  htmlFor: string;
  className?: string;
  children?: any;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-sm text-gray-700 ` + className}
    >
      {value ? value : children}
    </label>
  );
}


export const SelectArea = ({
  label,
  name,
  id,
  description = "",
  options = [],
  errrorMessage = "",
}: IFieldArea) => {
  const { getFieldValue, setFieldValue } = useImaginaryForm();
  const value = getFieldValue(name);

  return (
    <FieldWrapper
      id={id}
      errrorMessage={errrorMessage}
      label={label}
      description={description}
    >
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
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
    </FieldWrapper>
  );
};
export const InputArea = ({
  label,
  name,
  type,
  id,
  description = "",
  className = "",
}: IFieldArea) => {
  const { getFieldValue, setFieldValue, getFieldError } = useImaginaryForm();
  const ref = useRef(null);
  const errrorMessage = getFieldError(name);
  const onBlur = (e: any) => {
    setFieldValue(name, e.target.value);
  };
  useEffect(() => {
    if (getFieldValue(name)) {
      // @ts-ignore
      ref.current.value = getFieldValue(name);
    }
  }, []);

  return (
    <FieldWrapper
      id={id}
      label={label}
      errrorMessage={errrorMessage}
      description={description}
    >
      <div className="flex flex-col items-start">
        <input
          type={type}
          className={
            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
            className
          }
          ref={ref}
          id={id}
          name={name}
          defaultValue={getFieldValue(name)}
          onBlur={onBlur}
        />
      </div>
    </FieldWrapper>
  );
};
