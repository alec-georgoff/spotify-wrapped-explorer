import * as React from 'react';
import { useState } from 'react';
import { getAlbumById } from './api/SpotifyApi';
import { SpotifyAlbum } from './types/SpotifyTypes';

export const TestApiResults = () => {
    const [result, setResult] = useState<SpotifyAlbum>();

    React.useEffect(() => {
        getAlbumById('7jJdFic5YXGnrFUjultwMf').then(data => setResult(data));
    }, []);

    const imgSrc =
        result && result.images.sort((a, b) => (a.width && b.width ? b.width - a.width : 1));

    return (
        <div>
            <p>{result && result.name}</p>
            <img
                src={imgSrc && imgSrc.length > 0 ? imgSrc[0].url : ''}
                alt={result ? result.name : ''}
            />
        </div>
    );
};
