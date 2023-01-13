import YouTube from 'react-youtube';
import styles from "./VideoPlayer.module.css"

export default function VideoPlayer({songToPlay}) {

    const opts = {
        // height: '390',
        width: '900',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          rel: 0,
          modestbranding: 1
        },
      };

      function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    return(
        
        <div className={styles.videoContainer}>
            <YouTube videoId={songToPlay.song}  opts={opts} onReady={_onReady}/>
        </div>
    )
}