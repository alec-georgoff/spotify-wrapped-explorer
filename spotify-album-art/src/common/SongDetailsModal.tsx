import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { getArtistById } from '../api/SpotifyApi';
import { GetImage, ListWithCommas } from '../api/SpotifyHelpers';
import { SpotifyArtist, SpotifyTrack } from '../types/SpotifyTypes';

interface Props {
    song: SpotifyTrack;
    open: boolean;
    onClose: () => void;
}

export const SongDetailsModal = (props: Props) => {
    const [artistDetails, setArtistDetails] = useState<SpotifyArtist>();

    useEffect(() => {
        if (props.open) {
            getArtistById(props.song.artists[0].id).then(data => setArtistDetails(data));
        } else {
            setArtistDetails(undefined);
        }
    }, [props.open, props.song.artists]);

    return (
        <Modal show={props.open} onHide={props.onClose} centered>
            {artistDetails ? (
                <>
                    <Modal.Header className="modal-header">
                        <img
                            src={GetImage(artistDetails.images, 'large')}
                            alt={artistDetails.name}
                            className="song-details-artist-image"
                        />
                    </Modal.Header>
                    <Modal.Body>
                        <div className="open-modal-song-details">
                            <img
                                src={GetImage(props.song.album.images, 'large')}
                                alt={props.song.name}
                            />
                            <div>
                                <h4>{props.song.name}</h4>
                                <h5>
                                    {ListWithCommas(props.song.artists.map(artist => artist.name))}
                                </h5>
                            </div>
                        </div>
                        {props.song.preview_url && (
                            <div>
                                <audio
                                    src={props.song.preview_url}
                                    controls
                                    autoPlay={props.open}
                                    className="audio-player"
                                />
                            </div>
                        )}
                    </Modal.Body>
                </>
            ) : (
                <Modal.Header>Error loading artist info</Modal.Header>
            )}
        </Modal>
    );
};
