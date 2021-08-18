import { SpotifyClientCredentialsResult } from "../types/SpotifyTypes";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const credentialsToEncode = `${clientId}:${clientSecret}`;
const buff = new Buffer(credentialsToEncode);
const encodedCredentials = buff.toString('base64');

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

export const getAlbum = async (id: number) => {
    const clientCredentials = await getClientCredentials();

    const result = await fetch(`https://api.spotify.com/v1/albums/${id}`,
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + clientCredentials.access_token
        }
    });
}