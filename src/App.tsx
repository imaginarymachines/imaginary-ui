import { Button } from "../lib";
import { ILayout } from "../lib/Form";
import "./App.css";
import {useState} from 'react';

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
      "order": 1,

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
function App() {
  const [values,setValues] =useState<any>(()=> {
    const v : {[key:string]: string|number|undefined}= {};
    layout.fields.forEach((field) => {
      v[field.name] = field.defaultValue;
    });
    return v;
  });
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  }

  return (
    <>
      <form onSubmit={formHandler}>
        {layout.fields.map((field) => {
          if( 'select' === field.fieldType ) {
            return (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <select
                  value={values[field.name]}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [field.name]: e.target.value,
                    });
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
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                defaultValue={field.defaultValue}
                onBlur={(e) => {
                  setValues({
                    ...values,
                    [field.name]: e.target.value,
                  });
                }}
              />
            </div>
          );
        })}
        <input type="submit" value="Submit" />
        </form>
     </>
  );
}

export default App;
