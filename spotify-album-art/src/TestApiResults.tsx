import * as React from 'react';
import { useState } from 'react';
import { authorizationLink, getUsersTopTracks } from './api/SpotifyApi';
import { SpotifyTrack } from './types/SpotifyTypes';
import queryString from 'query-string';

export const TestApiResults = () => {
    const [accessToken, setAccessToken] = useState<string>();
    const [topTracks, setTopTracks] = useState<SpotifyTrack[]>();

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
            {topTracks &&
                topTracks.map(track => (
                    <p
                        key={track.id}
                    >{`${track.name}, ${track.artists[0].name}, ${track.popularity}`}</p>
                ))}
        </div>
    );
};
