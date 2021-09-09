import * as React from 'react';
import { GetImage } from '../api/SpotifyHelpers';
import { SpotifyPrivateUser } from '../types/SpotifyTypes';

interface Props {
    userProfile?: SpotifyPrivateUser;
}

export const UserProfileDisplay = (props: Props) => (
    <div className="user-profile-display">
        {props.userProfile && (
            <>
                <h4>{`Welcome, ${props.userProfile.display_name || 'Spotify User'}!`}</h4>
                <img
                    src={GetImage(props.userProfile.images, 'large')}
                    alt={props.userProfile.display_name || 'Profile image'}
                    className="profile-image"
                />
            </>
        )}
    </div>
);
