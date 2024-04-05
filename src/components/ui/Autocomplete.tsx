import { FC, useRef, useState } from "react";
import {TextField, TextFieldProps} from '../ui/TextField'
import {DaDataSuggestion, DaDataFio} from '../../types/types'
import style from "../../assets/styles/Autocomplete.module.css";

interface AutocompleteProps extends TextFieldProps {
    options: DaDataSuggestion<DaDataFio>[]
}

export const Autocomplete: FC<AutocompleteProps> = ({ options, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    
    return (
        <div 
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className="relative">
            <TextField
                {...rest}
            />
            <div className={`${style.dropdown} ${(isOpen && rest.value) && style.show}`}>
                {options.map((option) => 
                    <div 
                        onClick={(e)=>{
                            e.stopPropagation()
                            // selectOption(option.value)
                            setIsOpen(false)
                        }}
                        key={option.value} 
                        className={style.dropdownItem}>{option.value}</div>
                )}
            </div>


        </div>
    );
};
