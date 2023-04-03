import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { TFields } from "./Fields";
import { ILayout, IGroup } from "./Form";
import { INavItems } from "./Navigation";
import {
  collectFieldRules,
  collectFieldValues,
  TValuesObj,
  validator,
} from "./utils";
const ImaginaryFormContext = createContext<{
  fields: TFields;
  setFieldValue: (name: string, value: string | number | undefined) => void;
  getFieldValue: (name: string) => string | number | undefined;
  onNext: () => void;
  onBack: () => void;
  getFieldError: (name: string) => string | undefined;
  groupNav: INavItems;
  goToStep: (step: number) => void;
  totalSteps: number;
  currentStep: number;
  hasErrors: boolean;
  isValidating: boolean;
}>(
  // @ts-ignore
  null
);

export interface IFormEvents {
  stepChanged?: (step: number, currentGroup: IGroup) => void;
  validationFailed?: (errors: { [key: string]: string }) => void;
  validationPassed?: () => void;
}

export const ImaginaryFormProvider = ({
  children,
  layout,
  onSave,
  formEvents = undefined,
}: {
  children: React.ReactNode;
  layout: ILayout;
  onSave: (values: TValuesObj) => void;
  formEvents?: IFormEvents;
}) => {
  //steps as id: order
  const steps = useMemo<{ [key: string]: number }>(() => {
    let s: { [key: string]: number } = {};
    layout.groups.forEach((group) => {
      s[group.id] = group.order;
    });
    return s;
  }, [layout]);
  const totalSteps = useMemo(() => {
    return Object.keys(steps).length;
  }, [steps]);

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

  //isValidating
  const [isValidating, setIsValidating] = useState<boolean>(false);

  //error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const setFieldValue = (name: string, value: string | number | undefined) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const getFieldValue = (name: string) => {
    return data[name];
  };

  const fields = useMemo<TFields>(() => {
    //fields in current step
    const currentGroup = layout.groups.find((group) => {
      return group.order === currentStep;
    });
    if (!currentGroup) {
      return [];
    }
    return (
      layout.fields
        .filter((field) => {
          return currentGroup.fields.includes(field.name);
        })
        //if data has a value for field, set as defaultValue
        .map((field) => {
          return {
            ...field,
            defaultValue: data[field.name] ?? field.defaultValue,
          };
        })
    );
  }, [layout, currentStep]);

  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNext = () => {
    setIsValidating(true);
    let rules = collectFieldRules(fields);
    let values = collectFieldValues(fields, data);
    let { errors, isValid } = validator(values, rules);
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
    setIsValidating(false);
  };

  const getFieldError = (name: string): string | undefined => {
    if (errors[name]) {
      return errors[name];
    }
    return undefined;
  };

  //Navigation for breadcrumbs, etc.
  const groupNav = useMemo<INavItems>(() => {
    return layout.groups.map((group) => {
      return {
        href: `#${group.id}`,
        label: group.label,
        id: group.order.toString(),
        disabled: group.order > currentStep,
        active: group.order === currentStep,
      };
    });
  }, [layout]);
  const goToStep = (step: number) => {
    //do not go forward
    if (step > currentStep) {
      return;
    }
    if (step > 0 && step <= layout.groups.length) {
      setCurrentStep(step);
    }
  };

  //Do we have any errors?
  const hasErrors = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  //EVENTS
  //validationFailed
  useEffect(() => {
    if (undefined != formEvents?.validationFailed) {
      if (hasErrors) {
        formEvents.validationFailed(errors);
      }
    }
  }, [errors, hasErrors, formEvents?.validationFailed]);

  //When step changes, call stepChanged event
  useEffect(() => {
    if (undefined != formEvents?.stepChanged) {
      const currentGroup = layout.groups.find((group) => {
        return group.order === currentStep;
      });
      if (currentGroup) {
        formEvents.stepChanged(currentStep, currentGroup);
      }
    }
  }, [currentStep, layout.groups, formEvents?.stepChanged]);

  return (
    <ImaginaryFormContext.Provider
      value={{
        onNext,
        onBack,
        setFieldValue,
        getFieldValue,
        getFieldError,
        fields,
        goToStep,
        groupNav,
        totalSteps,
        currentStep,
        hasErrors,
        isValidating,
      }}
    >
      {children}
    </ImaginaryFormContext.Provider>
  );
};

export default function useImaginaryForm() {
  return useContext(ImaginaryFormContext);
}
