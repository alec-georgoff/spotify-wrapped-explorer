import * as React from 'react';
import { UserTopSong } from '../types/UserListeningHabits';

interface Props {
    song: UserTopSong;
}

export const SongDisplayCard = (props: Props) => (
    <div className="card">
        <img
            className="card-img-top"
            src={props.song.coverArt}
            alt={props.song.title}
            // style={{ maxWidth: '5rem' }}
        />
        <div className="card-body">
            <div className="song-title">{props.song.title}</div>
            <div className="song-artists">
                {props.song.artists.map((artist, index) => {
                    return `${artist}${index !== props.song.artists.length - 1 ? ', ' : ''}`;
                })}
            </div>
        </div>
    </div>
);
