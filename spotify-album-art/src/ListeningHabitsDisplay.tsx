import * as React from 'react';
import { useState } from 'react';
import { authorizationLink, getUsersProfile, getUsersTopTracks } from './api/SpotifyApi';
import { SpotifyPrivateUser, SpotifyTrack } from './types/SpotifyTypes';
import queryString from 'query-string';
import { SongDisplayCard } from './common/SongDisplayCard';
import { ListeningHabitsTimeframeOptions } from './types/UserListeningHabits';
import { DropdownOption, MainDropdown } from './common/MainDropdown';
import { Button, Spinner } from 'react-bootstrap';
import { UserProfileDisplay } from './common/UserProfileDisplay';

export const TestApiResults = () => {
    const [accessToken, setAccessToken] = useState<string>();
    const [topTracks, setTopTracks] = useState<SpotifyTrack[]>();
    const [userProfile, setUserProfile] = useState<SpotifyPrivateUser>();
    const [selectedTimeframe, setSelectedTimeframe] = useState<DropdownOption>(
        ListeningHabitsTimeframeOptions[0]
    );
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const queryResult = queryString.parse(window.location.hash);
        const parsedToken = queryResult.access_token;
        typeof parsedToken === 'string' && setAccessToken(parsedToken);
    }, []);

    React.useEffect(() => {
        setLoading(true);
        if (accessToken) {
            getUsersProfile(accessToken).then(data => {
                setUserProfile(data);
            });
            getUsersTopTracks(accessToken, selectedTimeframe.value).then(data => {
                setTopTracks(data.items);
            });
        }
        setLoading(false);
    }, [selectedTimeframe, accessToken]);

    const handleSelectTimeframe = (selectedValue: string) => {
        const matchingOption = ListeningHabitsTimeframeOptions.find(
            option => option.value === selectedValue
        );

        setSelectedTimeframe(matchingOption || ListeningHabitsTimeframeOptions[0]);
    };

    return (
        <div>
            <div className="profile-display-row">
                <UserProfileDisplay userProfile={userProfile} />
            </div>
            <div className="controls-row">
                <Button
                    className="btn-log-in"
                    onClick={() => window.location.assign(authorizationLink)}
                >
                    {accessToken ? 'Refresh Authorization' : 'Log In'}
                </Button>
                <MainDropdown
                    options={ListeningHabitsTimeframeOptions}
                    label={selectedTimeframe.display}
                    onSelect={handleSelectTimeframe}
                />
            </div>
            <div className="row">
                {loading ? (
                    <div className="loading-spinner">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    topTracks &&
                    topTracks.map(topSong => (
                        <div className="col-6 col-lg-2 song-display-column">
                            <SongDisplayCard key={topSong.id} song={topSong} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
