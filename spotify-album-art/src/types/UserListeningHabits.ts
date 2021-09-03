import { DropdownOption } from "../common/MainDropdown";

export enum Timeframe {
    shortTerm = 'Short Term',
    mediumTerm = 'Medium Term',
    longTerm = 'Long Term'
}

export const ListeningHabitsTimeframeOptions: DropdownOption[] = [
    {
        display: 'Short Term',
        value: 'short_term'
    },
    {
        display: 'Medium Term',
        value: 'medium_term'
    },
    {
        display: 'Long Term',
        value: 'long_term'
    }
]