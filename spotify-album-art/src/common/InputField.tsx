import * as React from 'react';

interface Props {
    inputTitle: string;
    value: string;
    updateValue: (newValue: string) => void;
}

const InputField = (props: Props) => (
    <div>
        <p>{props.inputTitle}</p>
        <input value={props.value} onChange={e => props.updateValue(e.target.value)} />
    </div>
);

export default InputField;
