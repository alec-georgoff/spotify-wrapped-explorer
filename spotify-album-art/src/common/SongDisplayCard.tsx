import * as React from 'react';
import { useState } from 'react';
import { GetImage, ListWithCommas } from '../api/SpotifyHelpers';
import { SpotifyTrack } from '../types/SpotifyTypes';
import { SongDetailsModal } from './SongDetailsModal';

interface Props {
    song: SpotifyTrack;
}

export const SongDisplayCard = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <SongDetailsModal
                song={props.song}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <div className="card song-display-card" onClick={() => setModalOpen(true)}>
                <img
                    className="card-img-top"
                    src={GetImage(props.song.album.images, 'large')}
                    alt={props.song.name}
                />
                <div className="card-body">
                    <div className="song-title">{props.song.name}</div>
                    <div className="song-artists">
                        {ListWithCommas(props.song.artists.map(artist => artist.name))}
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
        </>
    );
};
