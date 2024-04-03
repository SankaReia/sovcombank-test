import { FC, SelectHTMLAttributes, useEffect, useRef, useState } from "react";
import { SelectOptionI } from "../../types/types";
import style from "../../assets/styles/Select.module.css";


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label?: string;
    options: SelectOptionI[];
    value: string | string[]
    setValue: React.Dispatch<React.SetStateAction<string | string[]>>;
}

export const Select: FC<SelectProps> = ({ id, label, options, value, setValue, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        rest.multiple ? setValue([]) : setValue('')
    }
    
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
    
    //   useEffect(() => {
    //     const handler = (e: KeyboardEvent) => {
    //       if (e.target != containerRef.current) return
    //       switch (e.code) {
    //         case "Enter":
    //         case "Space":
    //           setIsOpen(prev => !prev)
    //           if (isOpen) selectOption(options[highlightedIndex])
    //           break
    //         case "ArrowUp":
    //         case "ArrowDown": {
    //           if (!isOpen) {
    //             setIsOpen(true)
    //             break
    //           }
    
    //           const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
    //           if (newValue >= 0 && newValue < options.length) {
    //             setHighlightedIndex(newValue)
    //           }
    //           break
    //         }
    //         case "Escape":
    //           setIsOpen(false)
    //           break
    //       }
    //     }
    //     containerRef.current?.addEventListener("keydown", handler)
    
    //     return () => {
    //       containerRef.current?.removeEventListener("keydown", handler)
    //     }
    //   }, [isOpen, highlightedIndex, options])
    

    return (
    //   <div className={style.formLabel}>
    //     <select {...rest} id={id}>
    //         {options.map((opt) => <option value={opt.value} key={opt.value}>{opt.label}</option> )}
    //     </select>
    //     {label && (
    //         <label htmlFor={id}>
    //             {label}
    //             {rest.required && '*'}
    //         </label>
    //     )}
    //   </div>
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className={style.container}
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
                {v}
                <span className={style["remove-btn"]}>&times;</span>
              </button>
            ))
          : value}
      </span>
      <button
        onClick={e => {
          e.stopPropagation()
          clearOptions()
        }}
        className={style["clear-btn"]}
      >
        &times;
      </button>
      <div className={style.divider}></div>
      <div className={style.caret}></div>
      <ul className={`${style.options} ${isOpen ? style.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={e => {
              e.stopPropagation()
              selectOption(option.value)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`${style.option} ${
              isOptionSelected(option.value) ? style.selected : ""
            } ${index === highlightedIndex ? style.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
    );
};
