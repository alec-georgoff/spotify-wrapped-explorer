import * as React from 'react';
import { Dropdown } from 'react-bootstrap';

export interface DropdownOption {
    value: string;
    display: string;
}

interface Props {
    options: DropdownOption[];
    label: string;
    onSelect: (value: string) => void;
}

export const MainDropdown = (props: Props) => (
    <Dropdown>
        <Dropdown.Toggle id="dropdown-item-button" className="main-dropdown">
            {props.label}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {props.options.map((option, index) => (
                <Dropdown.Item key={index} onClick={() => props.onSelect(option.value)}>
                    {option.display}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
);
