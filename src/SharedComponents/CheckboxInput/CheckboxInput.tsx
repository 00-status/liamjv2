
import { forwardRef } from 'react';

import './checkbox-input.css';

type Props = {
    label?: string;
    value: boolean;
    id?: string;
    placeholder?: string;
    onChange?: (value: boolean) => void;
    readonly?: boolean;
};

export const CheckboxInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const { label, value, id, placeholder, onChange, readonly} = props;

    return <div className="checkbox-input">
        {label && <label htmlFor={id}>{label}</label>}
        <input
            ref={ref}
            className='checkbox-input__input'
            readOnly={readonly}
            type="checkbox"
            id={id}
            placeholder={placeholder}
            checked={value}
            onClick={() => {
                if (onChange) {
                    onChange(!value);
                }
            }}
        />
    </div>;
});
