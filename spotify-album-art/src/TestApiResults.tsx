import * as React from 'react';
import { useState } from 'react';
import { authorizationLink, getUsersProfile, getUsersTopTracks } from './api/SpotifyApi';
import { SpotifyPrivateUser, SpotifyTrack } from './types/SpotifyTypes';
import queryString from 'query-string';
import { SongDisplayCard } from './common/SongDisplayCard';
import { ListeningHabitsTimeframeOptions, UserTopSong } from './types/UserListeningHabits';
import { GetImage } from './api/SpotifyHelpers';
import { DropdownOption, MainDropdown } from './common/MainDropdown';
import { Button } from 'react-bootstrap';

export const TestApiResults = () => {
    const [accessToken, setAccessToken] = useState<string>();
    const [topTracks, setTopTracks] = useState<SpotifyTrack[]>();
    const [userProfile, setUserProfile] = useState<SpotifyPrivateUser>();
    const [selectedTimeframe, setSelectedTimeframe] = useState<DropdownOption>(
        ListeningHabitsTimeframeOptions[0]
    );

    React.useEffect(() => {
        const queryResult = queryString.parse(window.location.hash);
        const parsedToken = queryResult.access_token;
        typeof parsedToken === 'string' && setAccessToken(parsedToken);
    }, []);

    React.useEffect(() => {
        if (accessToken) {
            getUsersProfile(accessToken).then(data => {
                setUserProfile(data);
            });
            getUsersTopTracks(accessToken, selectedTimeframe.value).then(data => {
                setTopTracks(data.items);
            });
        }
    }, [selectedTimeframe, accessToken]);

    const handleSelectTimeframe = (selectedValue: string) => {
        const matchingOption = ListeningHabitsTimeframeOptions.find(
            option => option.value === selectedValue
        );

        setSelectedTimeframe(matchingOption || ListeningHabitsTimeframeOptions[0]);
    };

    return (
        <div>
            <Button
                className="btn-log-in"
                onClick={() => window.location.assign(authorizationLink)}
            >
                Log In
            </Button>
            <MainDropdown
                options={ListeningHabitsTimeframeOptions}
                label={selectedTimeframe.display}
                onSelect={handleSelectTimeframe}
            />
            <h4>{userProfile ? `Welcome, ${userProfile.display_name}!` : 'Please log in'}</h4>
            <div className="row">
                {topTracks &&
                    topTracks
                        .map(track => {
                            return {
                                title: track.name,
                                artists: track.artists.map(artist => artist.name),
                                popularity: track.popularity,
                                coverArt: GetImage(track.album.images, 'large')
                            } as UserTopSong;
                        })
                        .map(topSong => (
                            <div className="col-6 col-lg-2 song-display-column">
                                <SongDisplayCard key={topSong.title} song={topSong} />
                            </div>
                        ))}
            </div>
        </div>
    );
};
