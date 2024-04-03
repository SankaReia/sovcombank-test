import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    // value: string
}


export const Checkbox: FC<CheckboxProps> = ({ id, label, ...rest }) => {
  return (
    <>
        <input type="checkbox" className={style.checkbox} id={id} />
        <label htmlFor={id}>{label}</label>
    </>
  )
}