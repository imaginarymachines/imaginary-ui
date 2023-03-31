import { IInputProps, ISelectProps } from "../dist";
import {
  IButton,
  IFieldErrorProps,
  IFormButtonWrapProps,
  ILabelProps,
  ISubmitButton,
} from "./Fields";

export const tailwind = {
  Input: ({
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
  },
  Select: ({ id, name, options, onChange, value }: ISelectProps) => {
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
  },
  fieldWrapperClassName: {
    className: "mt-4 w-full",
    descClassName: "mt-2 text-sm text-gray-500",
  },
  FieldLabel: ({ htmlFor, className = "", children }: ILabelProps) => {
    return (
      <label htmlFor={htmlFor} className={className}>
        {children}
      </label>
    );
  },
  FieldError: ({
    message,
    className = "text-sm text-red-600 mt-2",
  }: IFieldErrorProps) => {
    return message ? <p className={className}>{message}</p> : null;
  },
  Button: ({ text, onClick }: IButton) => (
    <button
      onClick={onClick}
      type="button"
      className="border-b-2 border-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 font-semibold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md shadow-sm text-black text-sm"
    >
      {text}
    </button>
  ),
  SubmitButton: ({ text }: ISubmitButton) => (
    <input
      type="submit"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      value={text}
    />
  ),
  FormButtonWrap: ({ children }: IFormButtonWrapProps) => (
    <div className="flex justify-end mt-4">{children}</div>
  ),
};
