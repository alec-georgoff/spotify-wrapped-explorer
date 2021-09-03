import { Modal } from 'react-bootstrap';
import { SpotifyTrack } from '../types/SpotifyTypes';

interface Props {
    song: SpotifyTrack;
    open: boolean;
    onClose: () => void;
}

export const SongDetailsModal = (props: Props) => (
    <Modal show={props.open} onHide={props.onClose}>
        <Modal.Header>Put artist photo here</Modal.Header>
    </Modal>
);
