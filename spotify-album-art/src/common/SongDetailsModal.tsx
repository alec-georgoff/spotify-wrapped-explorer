import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { getArtistById } from '../api/SpotifyApi';
import { GetImage } from '../api/SpotifyHelpers';
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
        <Modal show={props.open} onHide={props.onClose}>
            {artistDetails ? (
                <Modal.Header>
                    <img
                        src={GetImage(artistDetails.images, 'large')}
                        alt={artistDetails.name}
                        className="song-details-artist-image"
                    />
                </Modal.Header>
            ) : (
                <Modal.Header>Error loading artist info</Modal.Header>
            )}
        </Modal>
    );
};
