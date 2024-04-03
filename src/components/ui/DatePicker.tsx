import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/DatePicker.module.css";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    helperText?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const DatePicker: FC<DatePickerProps> = ({ id, label, helperText, value, setValue, ...rest }) => {
  return (
    <>  
        <div className={style.datePicker}>
            <input 
                onChange={(e)=> setValue(e.target.value)}
                type="date" 
                className={`${style.datePickerInput} ${!!helperText && style.datePickerInvalid}`} />
            {label && (
                <label htmlFor={id} className={`${style.datePickerLabel} ${!!value && style.datePickerLabelTop}`}>
                    {label}
                    {rest.required && '*'}
                </label>
            )}
        </div>

        {!!helperText && <div className="errorMessage">{helperText}</div>}
    </>
  )
}