import { DropdownOption } from "../common/Dropdown";

export interface UserTopSong {
    title: string,
    artists: string[],
    popularity: number,
    coverArt: string
}

export enum Timeframe {
    shortTerm,
    mediumTerm,
    longTerm
}

export const ListeningHabitsTimeframeOptions: DropdownOption[] = [
    {
        display: 'Short Term',
        value: Timeframe.shortTerm
    },
    {
        display: 'Medium Term',
        value: Timeframe.mediumTerm
    },
    {
        display: 'Long Term',
        value: Timeframe.longTerm
    }
]