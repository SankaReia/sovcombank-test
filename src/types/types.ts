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