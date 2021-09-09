import { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { getArtistById } from '../api/SpotifyApi';
import { GetImage, ListWithCommas } from '../api/SpotifyHelpers';
import { SpotifyArtist, SpotifyTrack } from '../types/SpotifyTypes';

interface Props {
    song: SpotifyTrack;
    open: boolean;
    onClose: () => void;
}

interface LoadingStatuses {
    artistDetails: boolean;
    artistImage: boolean;
    albumImage: boolean;
}

export const SongDetailsModal = (props: Props) => {
    const [artistDetails, setArtistDetails] = useState<SpotifyArtist>();
    const [loading, setLoading] = useState<LoadingStatuses>({
        artistDetails: true,
        artistImage: true,
        albumImage: true
    });

    useEffect(() => {
        if (props.open) {
            getArtistById(props.song.artists[0].id).then(data => setArtistDetails(data));
        } else {
            setArtistDetails(undefined);
        }
        setLoading(prevState => {
            return { ...prevState, artistDetails: false };
        });
    }, [props.open, props.song.artists]);

    return (
        <Modal show={props.open} onHide={props.onClose} centered>
            {artistDetails && !loading.artistDetails ? (
                <div
                    className={`${
                        loading.artistImage || loading.albumImage ? 'hidden' : 'fade-in'
                    }`}
                >
                    <Modal.Header className="modal-header">
                        <img
                            src={GetImage(artistDetails.images, 'large')}
                            alt={artistDetails.name}
                            className="song-details-artist-image"
                            onLoad={() => setLoading({ ...loading, artistImage: false })}
                        />
                    </Modal.Header>
                    <Modal.Body>
                        <div className="open-modal-song-details">
                            <img
                                src={GetImage(props.song.album.images, 'large')}
                                alt={props.song.name}
                                onLoad={() => setLoading({ ...loading, albumImage: false })}
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
                                    src={props.open ? props.song.preview_url : ''}
                                    controls
                                    autoPlay={props.open}
                                    className="audio-player"
                                />
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <Button
                            className="btn-log-in"
                            onClick={() => window.open(props.song.external_urls.spotify)}
                        >
                            Play on Spotify
                        </Button>
                        <Button className="btn-log-in" onClick={props.onClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            ) : (
                <div className="loading-spinner">
                    <Spinner animation="border" />
                </div>
            )}
        </Modal>
    );
};
