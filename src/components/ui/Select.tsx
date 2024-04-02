import { FC, SelectHTMLAttributes } from "react";
import { SelectOptionI } from "../../types/types";
import style from "../../assets/styles/Select.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label?: string;
    options: SelectOptionI[];
}

export const Select: FC<SelectProps> = ({ id, label, options, ...rest }) => {
    return (
      <div className={style.formLabel}>
        <select {...rest} id={id}>
            {options.map((opt) => <option value={opt.value} key={opt.value}>{opt.label}</option> )}
        </select>
        {label && (
            <label htmlFor={id}>
                {label}
                {rest.required && '*'}
            </label>
        )}
      </div>
    );
};
