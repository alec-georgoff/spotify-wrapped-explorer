import * as React from 'react';
import { UserTopSong } from '../types/UserListeningHabits';

interface Props {
    song: UserTopSong;
}

export const SongDisplayCard = (props: Props) => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{props.song.title}</h5>
            <h6 className="card-subtitle">
                {props.song.artists.map((artist, index) => {
                    return `${artist}${index !== props.song.artists.length - 1 ? ', ' : ''}`;
                })}
            </h6>
        </div>
    </div>
);
