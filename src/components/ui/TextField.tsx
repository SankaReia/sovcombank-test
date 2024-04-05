import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/TextField.module.css";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    fullWidth?: boolean;
    helperText?: string;
}

export const TextField: FC<TextFieldProps> = ({ label, fullWidth, helperText, ...rest }) => {
    return (
      <div className="relative">
        <div className={`${style.textField} ${style.textFieldFloating}`}>
            <input
              {...rest}
              placeholder={label} 
              className={`${style.textFieldInput} ${fullWidth && style.textFieldInputFull} ${!!helperText && style.textFieldInputInvalid}`} 
            />
            {label && (
                <label htmlFor={rest.id} className={style.textFieldLabel}>
                    {label}
                    {rest.required && '*'}
                </label>
            )}
        </div>
        {!!helperText && <div className="errorMessage">{helperText}</div>}
      </div>
    );
};
