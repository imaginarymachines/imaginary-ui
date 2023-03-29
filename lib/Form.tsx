import { Fragment,  useCallback,  useMemo, useState,  } from 'react';
import { Breadcrumbs, ImaginaryRow } from './Ui';
import useImaginaryForm, { ImaginaryFormProvider } from './useImaginaryForm';

const Form = () => {
    const { isValidating, fields, currentStep, FormLabel, forwardButtonText, backButtonText, onNext, onBack, errors } = useImaginaryForm();
    const handler = useCallback((e) => {
        e.preventDefault();
        onNext();
    }, [onNext]);

    return (
        <Fragment>
            <>
                {useMemo(
                    () => (
                        <form onSubmit={handler}>
                            {FormLabel ? (<FormLabel />) : null}
                            {fields ? fields.map(({ type, fields, id }) => {
                                return (
                                    <Fragment key={id}>
                                        <ImaginaryRow type={type} fields={fields} />
                                    </Fragment>
                                )
                            }) : null}
                            <div className={`flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4 px-4 sm:px-8`}>
                                {backButtonText ? (
                                <button
                                    className='text-sm font-semibold leading-6 text-gray-900'
                                onClick={onBack}>{backButtonText}</button>) : null}
                                <input type="submit" value={forwardButtonText}
                                    className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                            </div>
                        </form>),
                    [currentStep, errors,isValidating,fields,onBack,backButtonText,forwardButtonText,FormLabel]
                )}
            </>
        </Fragment>
    );


}

const FormBreadCrumbs = () => {
    const { groupNames, goToStep } = useImaginaryForm();
    return (
        <Breadcrumbs links={groupNames} onClick={(clicked) => {
            goToStep(clicked.step);
        }} />
    );
}

const getFieldById = (layout,fieldId) => {
    return layout.fields.find((field) => {
        return field.id === fieldId;
    });
};
export const ImaginaryForm = ({ layout, onSave }) => {
    //State for all fields
    const [data, setData] = useState(() => {
        let _data = {};
        layout.groups.forEach((group) => {
            group.fields.forEach((fieldId) => {
                let field = getFieldById(layout,fieldId);
                _data[fieldId] = field.defaultValue && undefined !== field.defaultValue ? field.defaultValue : '';

            });
        });
        return _data;
    });

    return (
        <div>
            <h2 className="text-2xl font-bold leading-tight tracking-tight">{layout.label}</h2>
            <Fragment>
                <ImaginaryFormProvider  data={data} setData={setData} layout={layout} onSave={onSave}>
                    <FormBreadCrumbs />
                    <Form />
                </ImaginaryFormProvider>
            </Fragment>
        </div>


    );

}
