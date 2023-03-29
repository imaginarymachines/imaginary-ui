import { createContext, useState, useMemo, useContext } from "react";
import { TFields } from "./Fields";
import { ILayout } from "./Form";
import { collectFieldRules, collectFieldValues, TValuesObj, validator } from "./utils";
const ImaginaryFormContext = createContext<{
    fields: TFields;
    setFieldValue: (name: string, value: string | number | undefined) => void;
    getFieldValue: (name: string) => string | number | undefined;
    onNext: () => void;
    onBack: () => void;
    getFieldError: (name: string) => string | undefined;
    groupNav: {
        href: string;
        label: string;
        step: number;
    }[];
    goToStep: (step: number) => void;
}>(
    // @ts-ignore
    null
);

export const ImaginaryFormProvider = ({ children, layout, onSave }: {
    children: React.ReactNode,
    layout: ILayout,
    onSave: (values: TValuesObj) => void,
}) => {

    //steps as id: order
    const steps = useMemo<{ [key: string]: number }>(() => {
        let s: { [key: string]: number } = {};
        layout.groups.forEach((group) => {
            s[group.id] = group.order;
        });
        return s;
    }, [layout]);
    //current step number
    const [currentStep, setCurrentStep] = useState<number>(1);
    //field data
    //Do not make this public
    //@todo useReducer/ store
    const [data, setData] = useState<TValuesObj>(() => {
        const v: TValuesObj = {};
        layout.fields.forEach((field) => {
            v[field.name] = field.defaultValue;
        });
        return v;
    });

    //error messages
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const setFieldValue = (name: string, value: string | number | undefined) => {
        setData({
            ...data,
            [name]: value,
        });
    }
    const getFieldValue = (name: string) => {
        return data[name];
    }

    const fields = useMemo<TFields>(() => {
        //fields in current step
        const currentGroup = layout.groups.find((group) => {
            return group.order === currentStep;
        });
        if (!currentGroup) {
            return [];
        }
        return layout.fields.filter((field) => {
            return currentGroup.fields.includes(field.name);
        });

    }, [layout, currentStep]);

    const onBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    const onNext = () => {
        let rules = collectFieldRules(fields);
        let values = collectFieldValues(fields, data);
        let { errors, isValid } = validator(values, rules);
        console.log({ errors, isValid});
        if (!isValid) {
            setErrors(errors);
            return;
        } else {
            setErrors({});
        }

        if (currentStep < layout.groups.length) {
            setCurrentStep(currentStep + 1);
        } else {
            onSave(data);
        }

    }

    const getFieldError = (name: string): string | undefined => {
        if (errors[name]) {
            return errors[name];
        }
        return undefined;
    }

    const groupNav = useMemo(() => {
        return layout.groups.map((group) => {
            return {
                href: `#${group.id}`,
                label: group.label,
                step: group.order,
                disabled: false,
            }
        });
    }, [layout]);
    const goToStep =  (step: number) => {
        if (step > 0 && step <= layout.groups.length) {
            setCurrentStep(step);
        }
    }


    return (
        <ImaginaryFormContext.Provider value={{
            onNext,
            onBack,
            setFieldValue,
            getFieldValue,
            getFieldError,
            fields,
            goToStep,
            groupNav,
        }}>
            {children}
        </ImaginaryFormContext.Provider>
    )
}


export default function useImaginaryForm() {
    return useContext(ImaginaryFormContext);
}
