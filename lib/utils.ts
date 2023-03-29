import { IField, IRow } from "./Fields";

export function welcomeMessage(name: string): string {
  return `Hello ${name}, Welcome to PBandJ!`;
}

export const fieldTo100Row = (field:IField):IRow => {
  let fieldType = field.fieldType ?? null;
  if (!fieldType && 'select' == field.type) {
      fieldType = 'select';
  }
  return {
      id: `row-${field.id}`,
      type: 'Row100',
      fields: [
          {
              id: field.id,
              type: field.type,
              label: field.label,
              name: field.name,
              description: field.description ?? undefined,
              fieldType,
              required: field.required ?? false,
              options: field.options ?? [],
          }
      ]
  }
}

//function to convert {'vendor.name': 'Vendor Name', 'vendor.slug': 'Vendor Slug', 'role': 'editor'} to {vendor: {name: 'Vendor Name', slug: 'Vendor Slug'}, role: 'editor'}
export function convertToNestedObject(obj:any):any {
  let newObj :any = {};
  for (let key in obj) {
      if (!key.includes('.')) {
          newObj[key] = obj[key];
      } else {
          let parts = key.split('.');
          //if 2 parts
          if (2 == parts.length) {
              //has newObj[parts[0]]
              //@ts-ignore
              if (!newObj[parts[0]]) {
                              //@ts-ignore

                  newObj[parts[0]] = {};
              }
                            //@ts-ignore

              newObj[parts[0]][parts[1]] = obj[key];
          }
          continue;
          //@todo handle more than 2 parts
      }
  }
  return newObj;
}



/**
*
* @param {[key:string] : string|number|[]string|number} data
* @param {[key:string] : string} rules
*/
export function validator(
    data: {[key:string] : string|number|[]},
    rules: {[key:string] : string},
 ) {
  let errors : {[key:string] : string} = {};
  //loop through data
  for (let fieldName in data) {
      //get rules for field
      let fieldRules = rules[fieldName];
      //if no rules, skip
      if (!fieldRules) {
          continue;
      }
      //split rules
      let splitRules = fieldRules.split('|');

      //has "required" rule
      if (splitRules.includes('required')) {
          //if field is empty, add error
          if (!data[fieldName]) {
              errors[fieldName] = 'Field is required';
          }
      }
      //if has value
      if (data[fieldName]) {
          //loop through rules
          for (let rule of fieldRules) {
              //skip "required" rule
              if ('required' == rule) {
                  continue;
              } else if ('snake' === rule) {
                //@ts-ignore
                  if (!/^[a-z0-9_]+$/.test(data[fieldName])) {
                      errors[fieldName] = 'Must be snake case';
                  }
              } else if ('slug' === rule) {
                                //@ts-ignore

                  if (!/^[a-z0-9-]+$/.test(data[fieldName])) {
                      errors[fieldName] = 'Must be slug case';
                  }
              }
              //"lowercase" rule
              else if ('lowercase' == rule) {
                                //@ts-ignore

                  if (data[fieldName] !== data[fieldName].toLowerCase()) {
                      errors[fieldName] = 'Must be lowercase';
                  }
              }//"uppercase" rule
              else if ('uppercase' == rule) {
                                //@ts-ignore

                  if (data[fieldName] !== data[fieldName].toUpperCase()) {
                      errors[fieldName] = 'Must be uppercase';
                  }
              }

          }
      }

  }
  //check if errors has any keys
  if (Object.keys(errors).length) {
      return {
          isValid: false,
          errors,
      };
  } else {
      return {
          isValid: true,
          errors,
      }
  }
}
