import React, { useCallback, useMemo, useState } from 'react';
import { fieldTo100Row, validator } from './utils';


//React context ImaginaryFormContext
//{data:{}, setData: () => {},errors: {}}
const ImaginaryFormContext = React.createContext(null);
//Provider
export const ImaginaryFormProvider = ({ data, setData, children, layout, onSave }) => {

    const groups = useMemo(() => {
        return layout.groups;
    }, [layout.groups]);
    //Which step are we on?
    const [currentStep, setCurrentStep] = useState(1);
    //Field errors
    const [errors, setErrors] = useState(() => {
        return {};
    });
    //is validating ?
    const [isValidating, setIsValidating] = useState(false);

    //Steps stepNumber: groupId
    //{[key: int]: string}]}
    const steps = useMemo(() => {
        let s = {}
        groups.forEach((group) => {
            s[parseInt(group.order, 10)] = group.id;
        });
        return s;
    }, [groups]);

    //Current step ID
    //string
    const stepId = useMemo(() => {
        return steps[currentStep];
    }, [currentStep, steps]);
    //Current group
    const currentGroup = useMemo(() => {
        return groups.find((group) => {
            return group.id === stepId;
        });
    }, [stepId, groups]);


    //Set state for one field
    const setFieldValue = (id, value) => {
        setData({
            ...data,
            [id]: value
        });
    }

    //Fields of current group
    const { fieldNames, fields, FormLabel } = useMemo(() => {
        let fieldNames = {}
        let fields = [];
        if (currentGroup) {
            currentGroup.fields.forEach((fieldName) => {
                let field = layout.fields.find((field) => {
                    return field.name === fieldName;
                });
                if (field) {
                    let value = field.value ?? field.defaultValue;
                    fieldNames[fieldName] = value ?? '';
                    fields.push(field);
                }
            });
        }
        return {
            fieldNames,
            fields: fields.map(fieldTo100Row),
            FormLabel: () => (
                <div className='mt-4'>
                    <h3 className={`text-xl font-bold leading-tight tracking-tight`}>{currentGroup?.label ?? ''}</h3>
                    {currentGroup?.description ? (
                        <p className={`text-sm font-medium leading-6 text-gray-900`}>
                            <>
                                {currentGroup?.link ? (
                                        <a
                                            target={'_blank'}
                                            href={currentGroup?.link} className="border-b-2 border-indigo-500" >
                                            {currentGroup?.description}
                                        </a>
                                    ):
                                    (<span>{currentGroup?.description}</span>)
                                }
                            </>
                        </p>
                    ) : null}

                </div>
            )
        }
    }, [currentGroup]);


    //Handler for next button
    const onNext = useCallback(() => {
        setIsValidating(true);
        //get field rules and values for current step
        let rules = {};
        let fieldValues = {};
        currentGroup.fields.forEach((fieldName) => {
            let field = layout.fields.find((field) => {
                return field.name === fieldName;
            });
            if (field) {
                rules[fieldName] = field.rules;
                //if field.required add rule
                if (field.required) {
                    rules[fieldName] = rules[fieldName]
                        ? rules[fieldName] + '|required' : 'required';
                }
                if (data[fieldName]) {
                    fieldValues[fieldName] = data[fieldName];
                } else {
                    fieldValues[fieldName] = field.defaultValue;
                }
            }
        });
        let { isValid, errors } = validator(fieldValues, rules,);
        if (isValid) {
            setErrors({});
            //is last step?
            if (currentStep === Object.keys(steps).length) {
                //submit
                onSave(data, (errors) => {
                    setErrors(errors);
                });
            } else {
                setCurrentStep(currentStep + 1);
            }
        } else {
            setErrors(errors);
        }
        setIsValidating(false);


    }, [setIsValidating, currentGroup, setErrors, onSave, steps, validator, layout.fields, data]);

    //Handler for back button
    const onBack = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep,]);

    //Text for next and back buttons
    const { forwardButtonText, backButtonText } = useMemo(() => {
        //Next unless is last step
        let forwardButtonText = 'Next';
        if (currentStep === Object.keys(steps).length) {
            forwardButtonText = 'Submit';
        }
        let backButtonText = 'Back';
        if (currentStep === 1) {
            backButtonText = undefined;
        }
        return {
            forwardButtonText,
            backButtonText
        }
    }, [currentStep, steps]);

    //Group names for navigation
    const groupNames = useMemo(() => {
        return groups.map((group) => {
            return {
                name: group.label,
                current: false,
                href: '#',
                id: group.id,
                step: parseInt(group.order, 10),
                //if is after current step
                disabled: parseInt(group.order, 10) > currentStep,
                current: parseInt(group.order, 10) === currentStep
            }
        });
    }, [groups, currentStep]);

    //go back to step if is before current
    const goToStep = (step) => {
        if (step < currentStep) {
            setCurrentStep(step);
        }
    }

    return (
        <ImaginaryFormContext.Provider value={{
            groupNames,
            onBack,
            forwardButtonText,
            backButtonText,
            onNext,
            currentStep,
            fieldNames,
            fields,
            data,
            setFieldValue,
            errors,
            FormLabel,
            goToStep,
            isValidating
        }}>
            {children}
        </ImaginaryFormContext.Provider>
    )
}
//useImaginaryForm()
const useImaginaryForm = () => {
    return React.useContext(ImaginaryFormContext);
}
export default useImaginaryForm;
