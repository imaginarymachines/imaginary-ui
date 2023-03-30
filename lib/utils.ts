import { IField, } from "./Fields";
import { IRow } from "./Navigation";
export type TValuesObj = {[key:string]: string|number|undefined};

export function welcomeMessage(name: string): string {
  return `Hello ${name}, Welcome to PBandJ!`;
}

export const fieldTo100Row = (field:IField):IRow => {
  let fieldType = field.fieldType ?? 'input';
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

export const collectFieldValues = (fields:IField[],allValues: TValuesObj):TValuesObj => {
    let values : TValuesObj = {};
    for (let field of fields) {
        if (allValues[field.name]) {
            values[field.name] = allValues[field.name];
        }else if( field.defaultValue){
            values[field.name] = field.defaultValue;
        }
    }
    return values;
}
export const collectFieldRules = (fields:IField[]):TRules => {
    let rules : TRules = {};
    for (let field of fields) {
        if (field.rules) {
            rules[field.name] = field.rules;
        }else{
            rules[field.name] = '';
        }
        if( field.required){
            // if rules includes required, skip
            if (field.rules && field.rules.includes('required')) {
                continue;
            }
            //if rules is empty, just required
            if (!rules[field.name]) {
                rules[field.name] = 'required';
            }else{
                //add required to rules
                rules[field.name] += '|required';
            }
        }
    }
    return rules;
}
export type TRules = {[key:string] : string};
export function validator(
    data: TValuesObj,
    rules: TRules,
 ) {
  let errors : {[key:string] : string} = {};

  Object.keys(rules).forEach((key:string) => {
    let rule = rules[key];
    if( rule ){
        let fieldRules = rule.split('|');
        //if key is not in data
        if (!data[key]) {
            if( fieldRules.includes('required')){
                errors[key] = 'required';
            }else{
                //if key is in data and not undefined
                if (data[key]&& undefined !== data[key]) {
                    let value  = data[key] as string | number;
                    if( 'number' == typeof value){
                        value = value.toString();
                    }
                    //loop through rules
                    for (let rule of fieldRules) {
                        //skip "required" rule
                        if ('required' == rule) {
                            continue;
                        } else if ('snake' === rule) {
                            if (!/^[a-z0-9_]+$/.test(value)) {
                                errors[key] = 'Must be snake case';
                            }
                        } else if ('slug' === rule) {
                            if (!/^[a-z0-9-]+$/.test(value)) {
                                errors[key] = 'Must be slug case';
                            }
                        }
                        //"lowercase" rule
                        else if ('lowercase' == rule) {
                            if (value !== value.toLowerCase()) {
                                errors[key] = 'Must be lowercase';
                            }
                        }//"uppercase" rule
                        else if ('uppercase' == rule) {
                            if (value !== value.toUpperCase()) {
                                errors[key] = 'Must be uppercase';
                            }
                        }//"email" rule
                        else if ('email' == rule) {
                            if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
                                errors[key] = 'Must be a valid email';
                            }
                        }

                    }
                }
            }

        }
    }else{
        return;
    }

  });

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
