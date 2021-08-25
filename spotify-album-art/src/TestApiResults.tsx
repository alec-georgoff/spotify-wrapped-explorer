import * as React from 'react';
import { useState } from 'react';
import { generateAuthorizationLink, getAlbumById } from './api/SpotifyApi';
import { SpotifyAlbum, SpotifyClientCredentialsResult } from './types/SpotifyTypes';
import queryString from 'query-string';

export const TestApiResults = () => {
    const [result, setResult] = useState<SpotifyAlbum>();
    const [accessToken, setAccessToken] = useState<string>();

    React.useEffect(() => {
        getAlbumById('7jJdFic5YXGnrFUjultwMf').then(data => setResult(data));
    }, []);

    React.useEffect(() => {
        const queryResult = queryString.parse(window.location.hash);
        const parsedToken = queryResult.access_token;
        typeof parsedToken === 'string' && setAccessToken(parsedToken);
    }, []);

    const imgSrc =
        result && result.images.sort((a, b) => (a.width && b.width ? b.width - a.width : 1));

    return (
        <div>
            <button onClick={() => (window.location.href = generateAuthorizationLink())}>
                Log In
            </button>
            <p>{accessToken}</p>
            <p>{result && result.name}</p>
            <img
                src={imgSrc && imgSrc.length > 0 ? imgSrc[0].url : ''}
                alt={result ? result.name : ''}
            />
        </div>
    );
};
