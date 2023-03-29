import { InputArea, SelectArea,IField } from './Fields';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
export interface IRow {
  id: string;
  type: TRowTypes;
  fields: IField[];
}
export type TRowTypes = 'Row100'| 'Row5050';
const Row5050 = ({ Left, Right }:{
  Left: React.FC;
  Right: React.FC;
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <Left />
      </div>
      <div className="sm:col-span-3">
        <Right />
      </div>
    </div>
  )
}
const Row100 = ({ Field }: {
  Field: React.FC;
}) => {
  return (
    <div className="flex items-center mt-4">
      <Field />
    </div>
  )
}

export const ImaginaryField = (props:IField) => {
  if ('input' === props.fieldType) {
    return <InputArea {...props} />
  }

  switch (props.fieldType) {
    case 'select':
      return <SelectArea {...props} />
    default:
      return <InputArea {...props} />
  }
}
export const ImaginaryRow = ({ type, fields }:{
  type: TRowTypes;
  fields: {
    Left:  IField;
    Right:  IField;
  }
}) => {
  if ('Row5050' === type) {
    return <Row5050 Left={() => <ImaginaryField {...fields.Left} />} Right={() => <ImaginaryField {...fields.Right} />} />
  }
  if ('Row100' === type) {
    return <Row100 Field={() => <ImaginaryField {...fields.Left} />} />
  }
  return null;
}



export interface IBreadLink {
  name: string;
  current: boolean;
  disabled: boolean;
}
export type TBreadLinks = IBreadLink[];
export function Breadcrumbs({ links, onClick }:{
  links: TBreadLinks;
  onClick: (link:IBreadLink) => void;
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {links.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <button
                onClick={() => onClick(page)}
                className={`${page.current ? 'text-gray-900 hover:text-gray-700' : `text-gray-500 hover:text-gray-700`}ml-4 text-sm font-medium`}
                aria-current={page.current ? 'page' : undefined}
                disabled={page.disabled}
              >
                {page.name}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </nav>

  )
}
