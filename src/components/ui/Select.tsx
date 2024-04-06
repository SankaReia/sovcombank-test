import { FC, SelectHTMLAttributes, useEffect, useRef, useState } from "react";
import { FormI, SelectOptionI, SelectValueType } from "../../types/types";
import style from "../../assets/styles/Select.module.css";


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label?: string;
    helperText?: string;
    options: SelectOptionI[];
    value: SelectValueType;
    setValue: (value: SelectValueType) => void
}

export const Select: FC<SelectProps> = ({ id, label, options, value, setValue, helperText, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    
      function selectOption(option: string) {
        if (rest.multiple && Array.isArray(value)) {
          if (value.includes(option)) {
            setValue(value.filter(o => o !== option))
          } else {
            setValue([...value, option])
          }
        } else {
          if (option !== value) setValue(option)
        }
      }
    
      function isOptionSelected(option: string) {
        return rest.multiple ? value.includes(option) : option === value
      }
    
    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
          if (e.target != containerRef.current) return
          switch (e.code) {
            case "Enter":
            case "Space":
              setIsOpen(prev => !prev)
              if (isOpen) setValue(options[highlightedIndex].value)
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
        <div className="relative">
            <div
                ref={containerRef}
                onBlur={() => setIsOpen(false)}
                onClick={() => setIsOpen(prev => !prev)}
                tabIndex={0}
                className={`${style.select} ${!!helperText && style.selectInvalid}`}
            >
                <span className={style.value}>
                    {rest.multiple && Array.isArray(value)
                        ? value.map(v => (
                            <button
                                key={v}
                                onClick={e => {
                                e.stopPropagation()
                                selectOption(v)
                                }}
                                className={style["option-badge"]}
                            >
                                {options.find(el => el.value == v)?.label}
                                <span className={style["remove-btn"]}>&times;</span>
                            </button>
                            ))
                        : options.find(el => el.value == value)?.label 
                    }
                </span>
                <div className={style.caret}></div>
                {
                    isOpen &&
                    <ul className={style.options}>
                        {options.map((option, index) => (
                        <li
                            onClick={e => {
                                e.stopPropagation()
                                selectOption(option.value)
                                setIsOpen(false)
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            key={option.value}
                            className={`${style.option}
                                ${ isOptionSelected(option.value) ? style.selected : ""} 
                                ${index === highlightedIndex ? style.highlighted : ""}`
                            }
                        >
                            {option.label}
                        </li>
                        ))}
                    </ul>
                }
                {label && (
                    <label htmlFor={id} className={`${style.selectLabel} ${(value.length > 0) && style.selectLabelTop}`}>
                        {label}
                        {rest.required && '*'}
                    </label>
                )}
            </div>
            {!!helperText && <div className="errorMessage">{helperText}</div>}
        </div>
    );
};
