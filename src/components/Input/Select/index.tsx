import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

export interface Option {
  label: string;
  value: number | string;
}

interface SelectProps {
  options: Option[];
  selected: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
}

const Select = ({
  options,
  selected,
  onChange,
  placeholder = "Select an option",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && selectRef.current && optionsRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownHeight = optionsRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - selectRect.bottom;
      const spaceAbove = selectRect.top;

      // If there's not enough space below but enough above, open upwards
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setOpenAbove(true);
      } else {
        setOpenAbove(false);
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option) => {
    onChange(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev === null || prev === options.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev === null || prev === 0 ? options.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (highlightedIndex !== null) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      className={styles.selectContainer}
      ref={selectRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="select-options"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className={styles.selected}>
        {selected ? (
          selected.label
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul
          className={`${styles.optionsList} ${
            openAbove ? styles.openAbove : ""
          }`}
          id="select-options"
          role="listbox"
          ref={optionsRef}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                selected?.value === option.value ? styles.active : ""
              } 
              ${highlightedIndex === index ? styles.highlighted : ""}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={selected?.value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
