import { SelectArea,IField, InputArea } from "./Fields"
export interface IRow {
    id: string;
    type: TRowTypes;
    fields: IField[];
  }
  export type TRowTypes = 'Row100'| 'Row5050';

const ImaginaryField = ({ field }: {
    field: IField
}) => {
    return (
        <>
        {
                'select' === field.fieldType ? (
                    <SelectArea {...field} />
                ) : (
                    <InputArea {...field} />
                )
            }
        </>
    );
}

export const Row100 = ({ field }: {
    field: IField
}) => {
    return (
        <div className="flex items-center mt-4">
            <ImaginaryField field={field} />
        </div>
    );
}
export const Row5050 = ({ fieldOne, fieldTwo }: {
    fieldOne: IField,
    fieldTwo: IField
}) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <ImaginaryField field={fieldOne} />
          </div>
          <div className="sm:col-span-3">
            <ImaginaryField field={fieldTwo} />
          </div>
        </div>
      )
}
