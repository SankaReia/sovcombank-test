import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/DatePicker.module.css";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
}

export const DatePicker: FC<DatePickerProps> = ({ label, helperText, ...rest }) => {
  return (
    <>  
        <div className={style.datePicker}>
            <input 
                {...rest}
                type="date" 
                className={`${style.datePickerInput} ${!!helperText && style.datePickerInvalid}`} />
            {label && (
                <label htmlFor={rest.id} className={`${style.datePickerLabel} ${!!rest.value && style.datePickerLabelTop}`}>
                    {label}
                    {rest.required && '*'}
                </label>
            )}
        </div>

        {!!helperText && <div className="errorMessage">{helperText}</div>}
    </>
  )
}