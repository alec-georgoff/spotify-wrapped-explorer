import { SpotifyImage, SpotifyTrack } from "../types/SpotifyTypes";

export const GetTrackAlbumArt = (track: SpotifyTrack, size: 'small' | 'large') => {
    const sortFn = (a: SpotifyImage, b: SpotifyImage) => (!a.width || !b.width ? 1 : size === 'small' ? a.width - b.width : b.width - a.width);
    const sorted = track.album.images.sort(sortFn);

    return sorted.length !== 0 ? sorted[0].url : '';
}