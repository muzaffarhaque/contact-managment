import React, {useState} from 'react';

interface Option {
    value : string,
    label : string,
    
}

interface SelectWithRadioOptionsProps {
    options : Option[],
    onOptionChange : (selectedOption : string) => void;
    defaultSet:string
}

const SelectWithRadioOptions : React.FC < SelectWithRadioOptionsProps > = ({options,defaultSet=undefined, onOptionChange}) => {
    const [selectedOption,setSelectedOption] = useState < string | undefined > (defaultSet );

    const handleOptionChange = (event : React.ChangeEvent < HTMLInputElement >) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        onOptionChange(newValue); 
    };

    return (
        <div>
            <h6 className='fs-18-14 fw-semibold mb-3'>Status:</h6>
            <div className='d-flex gap-4'>
                {options.map(option => (
                    <label key={option.value} className='fs-14-13 fw-medium d-flex align-items-center gap-2'>
                        <input
                            type="radio"
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={handleOptionChange}/> {option.label} &nbsp;&nbsp;
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SelectWithRadioOptions;
