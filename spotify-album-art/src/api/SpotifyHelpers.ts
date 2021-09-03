import { SpotifyImage } from "../types/SpotifyTypes";

export const GetImage = (images: SpotifyImage[], size: 'small' | 'large') => {
    const sortFn = (a: SpotifyImage, b: SpotifyImage) => (!a.width || !b.width ? 1 : size === 'small' ? a.width - b.width : b.width - a.width);
    const sorted = images.sort(sortFn);

    return sorted.length !== 0 ? sorted[0].url : '';
}

export const ListWithCommas = (words: string[]) => words.map((word, index) => `${word}${index !== words.length - 1 ? ', ' : ''}`);