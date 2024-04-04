export interface SelectOptionI {
    label: string;
    value: string;
}

export type SelectValueType = string | string[]

export interface FormI {
   full_name: string;
   birth_date: string;
   phone: string;
   gender: string;
   customer_group: SelectValueType;
   attending_physician: SelectValueType;
   sms: boolean;
}

export interface FormErrorI {
    full_name: string;
    birth_date: string;
    phone: string;
    customer_group: string;
}

type Nullable<T> = T | null;

export interface DaDataSuggestion<T> {
  value: string;
  unrestricted_value: string;
  data: T;
}

export type DaDataGender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export interface DaDataFio {
    surname: Nullable<string>;
    name: Nullable<string>;
    patronymic: Nullable<string>;
    gender: DaDataGender;
    qc: '0' | '1';
    source: null;
  }
  