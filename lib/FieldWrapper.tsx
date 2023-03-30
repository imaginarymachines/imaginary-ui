import { IField, InputError, FieldLabel } from "./Fields";

export interface IFieldWrapperProps {
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

export interface IFrieldWrapperClassNames {
  className: string;
  descClassName: string;
}

export const FieldWrapper = ({
  children,
  id,
  label,
  errrorMessage = "",
  description = "",
  classNames,
}: IFieldWrapperProps & {
  classNames: IFrieldWrapperClassNames;
}) => {
  return (
    <div className={classNames.className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {description ? (
        <p id={`${id}-description`} className={classNames.descClassName}>
          {description}
        </p>
      ) : null}
      <InputError message={errrorMessage} />
    </div>
  );
};
