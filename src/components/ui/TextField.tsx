import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/TextField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    helperText?: string;
}

export const TextField: FC<TextFieldProps> = ({ id, label, required, fullWidth, helperText, ...rest }) => {
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
                    {required && '*'}
                </label>
            )}
        </div>
        {!!helperText && <div className={style.textFieldMessage}>{helperText}</div>}
      </>
    );
};
