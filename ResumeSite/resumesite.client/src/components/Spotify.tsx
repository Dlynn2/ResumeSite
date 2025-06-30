import React, { useState, useEffect } from 'react';

interface WebPlaybackProps {
  token: string;
}

// Extend the window type for TypeScript
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

const WebPlayback: React.FC<WebPlaybackProps> = ({ token }) => {
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  //   const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      console.error('Spotify token is required for Web Playback SDK.');
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }: any) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state: any) => {
        if (!state) {
          return;
        }
        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        // player.getCurrentState().then((state: any) => {
        // //   (!state) ? setActive(false) : setActive(true);
        // });
      });

      player.connect();
    };

    // Cleanup
    return () => {
      if (player) {
        player.disconnect();
      }
    };
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          {current_track &&
          current_track.album &&
          current_track.album.images &&
          current_track.album.images[0] ? (
            <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
          ) : (
            <div
              className="now-playing__cover"
              style={{ width: 64, height: 64, background: '#222' }}
            />
          )}

          <div className="now-playing__side">
            <div className="now-playing__name">
              {current_track ? current_track.name : 'No track'}
            </div>
            <div className="now-playing__artist">
              {current_track && current_track.artists && current_track.artists[0]
                ? current_track.artists[0].name
                : ''}
            </div>
          </div>
        </div>
      </div>
      <button className="btn-spotify" onClick={() => player && player.previousTrack()}>
        &lt;&lt;
      </button>
      <button className="btn-spotify" onClick={() => player && player.togglePlay()}>
        {is_paused ? 'PLAY' : 'PAUSE'}
      </button>
      <button className="btn-spotify" onClick={() => player && player.nextTrack()}>
        &gt;&gt;
      </button>
    </>
  );
};

export default WebPlayback;
