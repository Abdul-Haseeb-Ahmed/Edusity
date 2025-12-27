import React from 'react'
import './VideoPlayer.css'
import { images } from '../CloundinaryImages/Urls'

function VideoPlayer({playState,setplayState}) {
    const player = React.useRef(null);

    const closeplayer = (e)=>{
    if(e.target === player.current){
        setplayState(false);
        }
    }
  return (
    <div className={`video-player ${playState?'': 'hide'}`} ref={player} onClick={closeplayer}> 
        <video src={images.collegeVideo} autoPlay muted controls ></video>
    </div>
  )
}
export default VideoPlayer