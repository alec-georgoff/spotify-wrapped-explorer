const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const credentialsToEncode = `${clientId}:${clientSecret}`;
const buff = new Buffer(credentialsToEncode);
const encodedCredentials = buff.toString('base64');

export type ClientCredentialsResult = {
    access_token: string,
    token_type: string,
    expires_in: number
};

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

    return await result.json().then(data => data as ClientCredentialsResult);
}