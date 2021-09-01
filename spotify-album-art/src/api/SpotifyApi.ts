import { SpotifyAlbum, SpotifyClientCredentialsResult, SpotifyPrivateUser, SpotifyTrackPagingObject } from "../types/SpotifyTypes";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const credentialsToEncode = `${clientId}:${clientSecret}`;
const buff = new Buffer(credentialsToEncode);
const encodedCredentials = buff.toString('base64');

const scopes = 'user-read-recently-played' +
    ' user-top-read';

export const getClientCredentials = async () => {
    let result = await fetch('https://accounts.spotify.com/api/token',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + encodedCredentials
        },
        body: encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials')
    });

    return await result.json().then(data => data as SpotifyClientCredentialsResult);
}

export const authorizationLink = 
    'https://accounts.spotify.com/authorize?' +
    'client_id=' + clientId +
    '&scope=' + scopes +
    '&response_type=token' +
    '&redirect_uri=' + encodeURIComponent('http://localhost:3000');

export const getAlbumById = async (id: string) => {
    const clientCredentials = await getClientCredentials();

    const result = await fetch(`https://api.spotify.com/v1/albums/${id}`,
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + clientCredentials.access_token
        }
    });

    return await result.json().then(data => data as SpotifyAlbum);
}

export const getUsersTopTracks = async (authorization: string, timeframe: string) => {
    const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}`,
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authorization
        }
    });

    return await result.json().then(data => data as SpotifyTrackPagingObject);
}

export const getUsersProfile = async (authorization: string) => {
    const result = await fetch('https://api.spotify.com/v1/me',
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authorization
        }
    });

    return await result.json().then(data => data as SpotifyPrivateUser);
}