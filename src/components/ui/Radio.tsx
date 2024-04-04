import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/Radio.module.css";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}


export const Radio: FC<RadioProps> = ({ label, ...rest }) => {
  return (
    <>
        <input type="radio" className={style.radio}  {...rest} />
        <label htmlFor={rest.id}>{label}</label>
    </>
  )
}