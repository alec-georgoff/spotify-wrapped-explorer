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
    const [loadingImage, setLoadingImage] = useState(true);

    return (
        <div className={loadingImage ? 'hidden' : 'fade-in'}>
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
                    onLoad={() => setLoadingImage(false)}
                />
                <div className="card-body">
                    <div className="song-title">{props.song.name}</div>
                    <div className="song-artists">
                        {ListWithCommas(props.song.artists.map(artist => artist.name))}
                    </div>
                    <span className="popularity-label">Popularity:</span>
                    <div className="progress">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${props.song.popularity}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
