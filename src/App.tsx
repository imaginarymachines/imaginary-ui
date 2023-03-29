import { ILayout } from "../lib/Form";
import "./App.css";
import {createContext, useState,useMemo,useContext, Fragment} from 'react';
import { IField, TFields } from "../lib/Fields";
import { collectFieldRules,validator, collectFieldValues, TValuesObj } from "../lib/utils";

const layout : ILayout = {
  id: "vendor",
  "label": "Vendor Info",
  "groups": [
    {
        "id": "vendor",
        "label": "Vendor Info",
        "order": 1,
        "description": "The vendor information",
        "link": "https://docs.trustedlogin.com/Client/configuration",
        "fields": [
            "vendor.namespace",
            "vendor.title",
            "vendor.email",
            "vendor.website",
            "vendor.support_url"
        ]
    },
    {
      "id": "roles",
      "label": "Roles",
      "order": 2,

      "fields": [
          "role"
      ]
  },

],
"fields": [


    {
        "id": "vendor.namespace",
        "name": "vendor.namespace",
        "label": "Vendor Namespace",
        "type": "text",
        "fieldType": "input",
        "defaultValue": undefined,
        "description": "Slug for vendor. Must be unique. Must be shorter than 96 characters. Must not be a reserved namespace: trustedlogin, client, vendor, admin, wordpress.",
        "options": [],
        "required": true,
        "rules": "lowercase|alpha_dash"
    },
    {
        "id": "vendor.title",
        "name": "vendor.title",
        "label": "Title",
        "type": "text",
        "fieldType": "input",
        "defaultValue": undefined,
        "description": "Name of the vendor company. Used in text such as Visit the %s website",
        "options": [],
        "required": true
    },
    {
        "id": "vendor.email",
        "name": "vendor.email",
        "label": "Email",
        "type": "email",
        "fieldType": "input",
        "defaultValue": undefined,
        "link": "https://docs.trustedlogin.com/Client/configuration#email-hash",
        "description": "Email address for support. Used when creating usernames. Recommended: use {hash} dynamic replacement ",
        "options": [],
        "required": true,
        "rules": "email"
    },
    {
        "id": "vendor.website",
        "name": "vendor.website",
        "label": "Website",
        "type": "url",
        "fieldType": "input",
        "defaultValue": undefined,
        "description": "URL to the vendor support page. Shown to users in the Grant Access form and also serves as a backup to redirect users if the TrustedLogin server is unreachable. Must be a valid URL.",
        "options": [],
        "required": true,
        "rules": "url"
    },
    {
        "id": "vendor.support_url",
        "name": "vendor.support_url",
        "label": "Support URL",
        "type": "url",
        "fieldType": "input",
        "defaultValue": undefined,
        "description": "",
        "options": [],
        "required": true,
        "rules": "url"
    },
    {
        "id": "role",
        "name": "role",
        "label": "Role",
        "type": "select",
        "defaultValue": "editor",
        "description": "",
        fieldType: 'select',
        "options": [
            {
                "value": "editor",
                "label": "Editor"
            },
            {
                "value": "admin",
                "label": "Administrator"
            }
        ],
        "required": true,
        "rules": "in:editor,admin"
    }
]
}

const ImaginaryFormContext = createContext<{
  fields: TFields;
  setFieldValue : (name: string, value: string|number|undefined) => void;
  getFieldValue : (name: string) => string|number|undefined;
  values: TValuesObj;
  onNext: () => void;
  onBack: () => void;
  getFieldError: (name: string) => string|undefined;
}>(
  // @ts-ignore
  null
);

const ImaginaryFormProvider = ({children,layout,onSave}: {
  children: React.ReactNode,
  layout: ILayout,
  onSave: (values: TValuesObj) => void,
}) => {

  //steps as id: order
  const steps = useMemo<{[key:string]: number}>(() => {
    let s : {[key:string]: number} = {};
     layout.groups.forEach((group) => {
      s[group.id] = group.order;
    });
    return s;
  },[layout]);
  //current step number
  const [currentStep,setCurrentStep] = useState<number>(1);
  //field data
  //Do not make this public
  //@todo useReducer/ store
  const [data,setData] =useState<TValuesObj>(()=> {
    const v : TValuesObj = {};
    layout.fields.forEach((field) => {
      v[field.name] = field.defaultValue;
    });
    return v;
  });

  //error messages
  const [errors,setErrors] = useState<{[key:string]: string}>({});

  const setFieldValue = (name: string, value: string|number|undefined) => {
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

  },[layout,currentStep]);

  const onBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  const onNext = () => {
    let rules = collectFieldRules(fields);
    let values = collectFieldValues(fields,data);
    let {errors,isValid} =  validator(values,rules);
    console.log({rules,values,isValid});
    if (!isValid) {
      setErrors(errors);
      return;
    }else{
      setErrors({});
    }

    if (currentStep < layout.groups.length) {
      setCurrentStep(currentStep + 1);
    }else{
      onSave(data);
    }

  }

  const getFieldError = (name: string) : string|undefined => {
    if( errors[name]){
      return errors[name];
    }
    return undefined;
  }


  return (
    <ImaginaryFormContext.Provider value={{
      onNext,
      onBack,
      setFieldValue,
      getFieldValue,
      getFieldError,
      fields,
      //@todo not send values
      values:data,
    }}>
      {children}
    </ImaginaryFormContext.Provider>
  )
}

const Input = (props: IField) => {
  const {getFieldValue,setFieldValue} = useContext(ImaginaryFormContext);
  return (
    <div>
      <input name={props.name} defaultValue={getFieldValue(props.name)} onBlur={(e) => {
        setFieldValue(props.name,e.target.value);
      }} />
      </div>
  )
}

const InputArea = (props:IField) => {
  const {getFieldError} = useContext(ImaginaryFormContext);
  const errorMessage = getFieldError(props.name);
  return (
    <div key={props.id}>
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        {props.required ? <span>*</span> : null}
      </label>
      <Input {...props} />
      {errorMessage ? <span>{errorMessage}</span> : null}
    </div>
  )
};

const Form = () => {
  const {fields,setFieldValue,values,onNext,onBack} = useContext(ImaginaryFormContext);
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  }
  const backHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onBack();
  }
  return (
    <>
      <form onSubmit={formHandler}>
        {fields.map((field) => {
          if( 'select' === field.fieldType ) {
            return (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <select
                  value={values[field.name]}
                  onChange={(e) => {
                    setFieldValue(field.name,e.target.value);
                  }}
                  id={field.id}
                  name={field.name}
                >
                  {field.options ?field.options.map((option) => {
                    return (
                      <option key={option.value}value={option.value}>{option.label}</option>
                    )
                  }) : null}
                </select>
              </div>
            )
          }
          return (
            <Fragment key={field.id}>
              <InputArea {...field} />
            </Fragment>
          )
        })}
        <button onClick={backHandler}>Back</button>
        <input type="submit" value="Submit" />
        </form>
     </>
  );

}
function App() {

  const onSave = (data: any) => {
    console.log(data);
  }

  return (
    <>
      <ImaginaryFormProvider layout={layout} onSave={onSave}>
        <Form />
      </ImaginaryFormProvider>
      </>
  );
}

export default App;
