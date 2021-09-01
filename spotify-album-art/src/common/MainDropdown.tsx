import * as React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

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
    <DropdownButton id="dropdown-item-button" title={props.label}>
        {props.options.map((option, index) => (
            <Dropdown.Item key={index} onClick={() => props.onSelect(option.value)}>
                {option.display}
            </Dropdown.Item>
        ))}
    </DropdownButton>
);
