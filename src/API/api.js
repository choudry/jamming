const clientId = '';
const redirectUri = 'http://localhost:3000/';
let accessToken;

export const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
		if (accessTokenMatch && expiresInMatch) {
		accessToken = accessTokenMatch[1];
		const expiresIn = Number(expiresInMatch[1]);
		window.setTimeout(() => accessToken = '', expiresIn * 1000);
		window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
		return accessToken;
		} else {
		const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
		window.location = accessUrl;
	}
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
	console.log(`trackUris: ${trackUris}`)

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
}


export async function searchTracks(term) {
	const accessToken = Spotify.getAccessToken();
	const url = `https://spotify23.p.rapidapi.com/search/?q=${term}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'ed08e7434dmsh8df537c8499f5b3p154f6bjsn9a8ed1d65ce9',
			'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		const tracks = await result.tracks.items.map(track => {
			return {
				id: track.data.id,
				uri: track.data.uri,
				name: track.data.name,
				artist: track.data.artists.items.length ? track.data.artists.items[0].profile.name : ""
			}
		})

		return tracks;
	} catch (error) {
		console.error(error);
		return []
	}
}
