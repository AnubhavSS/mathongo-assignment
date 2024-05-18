"use client";
import React,{useState,useRef} from "react";
import ReactPlayer from "react-player";
import Notes from "./Notes";


const VideoPlayer = () => {
const ref=useRef()
const player=useRef()
const [playerTime, setplayerTime] = useState(0)
    const [videoUrl, setvideoUrl] = useState("https://www.youtube.com/watch?v=LXb3EKWsInQ")
   const handleSubmit=()=>{
    setvideoUrl(ref.current.value)
   }

   //Getting timing for video
const getTime=()=>{
setplayerTime(player.current.getCurrentTime())
}

//Jump to specific timestamp
const jumpToPoint=(val)=>{
player.current?.seekTo(val)

}
  return (
   
    <>
      {/* Render a YouTube video player */}
      <div className="flex flex-col justify-center items-center w-full">
        <ReactPlayer
          url={videoUrl}
          controls
          width={"90vw"}
          height={774}
          pip={true}
          style={{ borderRadius: 10 }}
          ref={player}
        />
        <div>
      
          <input
            className="shadow appearance-none border rounded w-[80vw] py-2 px-3 mt-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="URL"
            type="text"
        ref={ref}
        defaultValue={''}
            placeholder="Enter the video URL"
          />
     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleSubmit}>
  Go
</button>
        </div>
      </div>

      <Notes id={videoUrl.slice(32)} getTime={getTime} playerTime={playerTime} jumpToPoint={jumpToPoint} />
    </>
  );
};

export default VideoPlayer;
