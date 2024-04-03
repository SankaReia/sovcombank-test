import { FC, InputHTMLAttributes } from "react";
import style from "../../assets/styles/Radio.module.css";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    name: string
}


export const Radio: FC<RadioProps> = ({ id, label, name, ...rest }) => {
  return (
    <>
        <input type="radio" className={style.radio} id={id} name={name}/>
        <label htmlFor={id}>{label}</label>
    </>
  )
}