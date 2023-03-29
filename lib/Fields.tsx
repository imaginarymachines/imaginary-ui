import { useEffect, useRef } from 'react';


export type TFieldTypes = 'input'|'select';

export interface IOption {
    value: string;
    label: string;
}

export type TOptions = IOption[];
export interface IField {
  id: string;
  type: string;
  fieldType?:TFieldTypes;
  defaultValue?: string;
  label: string;
  name: string;
  description?: string;
  link? : string;
  required?: boolean;
  options?:TOptions;
  rules? : string;
}
export type TFields = IField[];


const setFieldValue = (name: string, value: string) => {
    console.log(name, value);
}

const getFieldValue = (name: string):string|undefined => {
    return '';
}
export function  InputError({ message, className = '' }:{
    message: string,
    className?: string,
}) {
    return message ? (
        <p className={'text-sm text-red-600 ' + className}>
            {message}
        </p>
    ) : null;
}

export function InputLabel({ value,htmlFor, className = '', children,  }:{
    value: string,
    htmlFor: string,
    className?: string,
    children?: any,
}) {
    return (
        <label htmlFor={htmlFor} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}

export const FieldWrapper = ({ children,id,label,errrorMessage = '',name,description  = '' }:{
    children: any,
    id: string,
    label: string,
    errrorMessage?: string,
    name: string,
    description?: string
}) => {
    return (
        <div className="mt-4 w-full">
            <InputLabel htmlFor={id} value={label} />
            {children}
            {description ? (<p id={`${id}-description`}
                className={`${errrorMessage ? 'bg-red ' : ''}mt-2 text-sm text-gray-500`}>{description}</p>) : null}
            <InputError message={errrorMessage} className="mt-2" />
        </div>
    );
}
export const SelectArea = ({ label, name, id,description = '', isFocused = false, options = [],errrorMessage = '' }:{
    label: string,
    name: string,
    id: string,
    description?: string,
    isFocused?: boolean,
    options?: {
        value: string,
        label: string

    }[],
    errrorMessage?: string
}) => {
    const value = getFieldValue(name);

    return (
        <FieldWrapper id={id} name={name} errrorMessage={errrorMessage} label={label} description={description}>
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
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )
                })}
                </select>

        </FieldWrapper>
    )
}
export const InputArea = ({ label, name, type, id, description = '',className= '', ...props }:{
    label: string,
    name: string,
    type: string,
    id: string,
    className?: string,
    description?: string,

}) => {
    const ref = useRef(null);
    const onBlur = (e:any) => {
        setFieldValue(name, e.target.value);
    }
    useEffect(() => {
        if( getFieldValue(name) ){
            // @ts-ignore
            ref.current.value = getFieldValue(name);
        }
    }, []);


    return (
        <FieldWrapper id={id} label={label}  name={name} errrorMessage={''} description={description} >
            <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                    className
                }
                ref={ref}
            />
        </div>
        </FieldWrapper>
    );
}
