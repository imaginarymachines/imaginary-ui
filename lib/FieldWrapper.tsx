import { IField, InputError, InputLabel } from "./Fields";

export interface IFieldWrapper {
  children: any;
  id: string;
  label: string;
  errrorMessage?: string;
  description?: string;
}

export interface IFieldArea extends IField {
  errrorMessage?: string;
  className?: string;
}
export const FieldWrapper = ({
  children,
  id,
  label,
  errrorMessage = "",
  description = "",
}: IFieldWrapper) => {
  return (
    <div className="mt-4 w-full">
      <InputLabel htmlFor={id} value={label} />
      {children}
      {description ? (
        <p
          id={`${id}-description`}
          className={`${
            errrorMessage ? "bg-red " : ""
          }mt-2 text-sm text-gray-500`}
        >
          {description}
        </p>
      ) : null}
      <InputError message={errrorMessage} className="mt-2" />
    </div>
  );
};
