import * as React from 'react';

export interface DropdownOption {
    value: number;
    display: string;
}

interface Props {
    options: DropdownOption[];
    label: string;
    onSelect: (value: number) => void;
}

export const Dropdown = (props: Props) => (
    <div className="dropdown">
        <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            aria-haspopup="true"
            aria-expanded="false"
        >
            {props.label}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.options.map((option, index) => (
                <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => props.onSelect(option.value)}
                >
                    {option.display}
                </div>
            ))}
        </div>
    </div>
);
