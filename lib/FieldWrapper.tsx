import { IField } from "./Fields";

export interface IFieldWrapperProps {
  children: any;
  id: string;
  label: string;
  errrorMessage?: string | undefined;
  description?: string;
}

export interface IFieldArea extends IField {
  errrorMessage?: string;
  className?: string;
}

export interface IFrieldWrapperClassNames {
  className: string;
  descClassName: string;
}
