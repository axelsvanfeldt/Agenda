import React from 'react';
import './RadioButton.css';

const RadioButton = ({group, label, options, selected, onClick}) => {
    const content = options.map((option, index) => {
        const optionValue = option.toLowerCase()
        const optionClass = optionValue === selected ? 'input-radio-option input-radio-option-selected' : 'input-radio-option';
        return <div key={index} className={optionClass} onClick={() => onClick(group, optionValue)}>{option}</div>
    });
    
    return (
        <div className="input-radio">
            {content}
        </div>
    );    
}

export default RadioButton;