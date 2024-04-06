import { FC, useRef, useState, useEffect } from "react";
import {TextField, TextFieldProps} from '../ui/TextField'
import {DaDataSuggestion, DaDataFio} from '../../types/types'
import style from "../../assets/styles/Autocomplete.module.css";

interface AutocompleteProps extends TextFieldProps {
    options: DaDataSuggestion<DaDataFio>[]
    setValue: (value: string) => void
}

export const Autocomplete: FC<AutocompleteProps> = ({ options, setValue, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
      }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          switch (e.code) {
            case "Enter":
              setIsOpen(prev => !prev)
              break
            case "ArrowUp":
            case "ArrowDown": {
              if (!isOpen) {
                setIsOpen(true)
                break
              }
              const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
              
              if (newValue >= 0 && newValue < options.length) {
                setHighlightedIndex(newValue)
                setValue(options[newValue]?.value)
              }
              break
            }
            case "Escape":
              setIsOpen(false)
              break
          }
        }
        containerRef.current?.addEventListener("keydown", handler)
    
        return () => {
          containerRef.current?.removeEventListener("keydown", handler)
        }
    }, [isOpen, highlightedIndex, options])
    
    return (
        <div 
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true) }
            onChange={() => setIsOpen(true)}
            tabIndex={0}
            className="relative">
            <TextField
                {...rest}
            />
            {
                (isOpen) &&
                <ul className={style.dropdown}>
                    {options.map((option: DaDataSuggestion<DaDataFio>, index) => 
                        <li 
                            onClick={(e) => {
                                e.stopPropagation()
                                setValue(option.value)
                                setIsOpen(false)
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            key={option.value} 
                            className={`${style.dropdownItem} ${(index == highlightedIndex) && style.highlighted}`}
                            >
                            {option.value}
                        </li>
                    )}
                </ul>
            }


        </div>
    );
};
