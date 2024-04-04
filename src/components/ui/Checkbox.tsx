import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}


export const Checkbox: FC<CheckboxProps> = ({ label, ...rest }) => {
  return (
    <>
        <input type="checkbox" className={style.checkbox}  {...rest}/>
        <label htmlFor={rest.id}>{label}</label>
    </>
  )
}