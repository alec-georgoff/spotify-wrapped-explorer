import * as React from 'react';
import { useState } from 'react';
import { authorizationLink, getUsersTopTracks } from './api/SpotifyApi';
import { SpotifyTrack } from './types/SpotifyTypes';
import queryString from 'query-string';
import { SongDisplayCard } from './common/SongDisplayCard';
import {
    ListeningHabitsTimeframeOptions,
    Timeframe,
    UserTopSong
} from './types/UserListeningHabits';
import { GetTrackAlbumArt } from './api/SpotifyHelpers';
import { MainDropdown } from './common/MainDropdown';

export const TestApiResults = () => {
    const [accessToken, setAccessToken] = useState<string>();
    const [topTracks, setTopTracks] = useState<SpotifyTrack[]>();
    const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>(Timeframe.mediumTerm);

    React.useEffect(() => {
        const queryResult = queryString.parse(window.location.hash);
        const parsedToken = queryResult.access_token;
        typeof parsedToken === 'string' && setAccessToken(parsedToken);
    }, []);

    React.useEffect(() => {
        if (accessToken && !topTracks) {
            getUsersTopTracks(accessToken).then(data => {
                setTopTracks(data.items);
            });
        }
    });

    return (
        <div>
            <button onClick={() => window.location.assign(authorizationLink)}>Log In</button>
            <MainDropdown
                options={ListeningHabitsTimeframeOptions}
                label="Timeframe"
                onSelect={(value: number) => setSelectedTimeframe(value)}
            />
            <div>{selectedTimeframe}</div>
            <div className="row">
                {topTracks &&
                    topTracks
                        .map(track => {
                            return {
                                title: track.name,
                                artists: track.artists.map(artist => artist.name),
                                popularity: track.popularity,
                                coverArt: GetTrackAlbumArt(track, 'large')
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
