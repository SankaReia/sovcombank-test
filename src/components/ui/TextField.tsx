import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/TextField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    fullWidth?: boolean;
    helperText?: string;
}

export const TextField: FC<TextFieldProps> = ({ id, label, fullWidth, helperText, ...rest }) => {
    return (
      <>
        <div className={`${style.textField} ${style.textFieldFloating}`}>
            <input
              id={id}
              {...rest}
              placeholder={label} 
              className={`${style.textFieldInput} ${fullWidth && style.textFieldInputFull} ${!!helperText && style.textFieldInputInvalid}`} 
            />
            {label && (
                <label htmlFor={id} className={style.textFieldLabel}>
                    {label}
                    {rest.required && '*'}
                </label>
            )}
        </div>
        {!!helperText && <div className="errorMessage">{helperText}</div>}
      </>
    );
};
