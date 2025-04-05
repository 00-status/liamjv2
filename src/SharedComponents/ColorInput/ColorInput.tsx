
import { forwardRef } from 'react';
import './color-input.css';

type Props = {
    label?: string;
    value: string|number;
    id?: string;
    onChange?: (value?: string) => void;
    readonly?: boolean;
};

export const ColorInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const { label, value, id, onChange, readonly } = props;

    return <div className="color-input">
        {label && <label htmlFor={id}>{label}</label>}
        <input
            ref={ref}
            className='color-input__input'
            readOnly={readonly}
            type='color'
            id={id}
            value={value}
            onChange={(value) => {
                const newValue = value.target.value ?? '';
                onChange ? onChange(newValue) : null;
            }}
        />
    </div>;
});
