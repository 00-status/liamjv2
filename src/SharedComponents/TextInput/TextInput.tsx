
import { forwardRef } from 'react';
import './text-input.css';

type Props = {
    label?: string;
    value: string|number;
    id?: string;
    placeholder?: string;
    onChange?: (value?: string) => void;
    readonly?: boolean;
    numbersOnly?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const { label, value, id, placeholder, onChange, readonly, numbersOnly } = props;

    return <div className="text-input">
        {label && <label htmlFor={id}>{label}</label>}
        <input
            ref={ref}
            className='text-input__input'
            readOnly={readonly}
            type={numbersOnly ? "number" : "text"}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(value) => {
                const newValue = value.target.value ?? '';
                onChange ? onChange(newValue) : null;
            }}
        />
    </div>;
});
