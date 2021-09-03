import * as React from 'react';
import { GetImage } from '../api/SpotifyHelpers';
import { SpotifyTrack } from '../types/SpotifyTypes';

interface Props {
    song: SpotifyTrack;
}

export const SongDisplayCard = (props: Props) => (
    <div className="card song-display-card">
        <img
            className="card-img-top"
            src={GetImage(props.song.album.images, 'large')}
            alt={props.song.name}
        />
        <div className="card-body">
            <div className="song-title">{props.song.name}</div>
            <div className="song-artists">
                {props.song.artists.map((artist, index) => {
                    return `${artist.name}${index !== props.song.artists.length - 1 ? ', ' : ''}`;
                })}
            </div>
            <div className="progress progress-bar-container">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${props.song.popularity}%` }}
                ></div>
            </div>
            {/* <audio controls src={props.song.preview} /> */}
        </div>
    </div>
);
