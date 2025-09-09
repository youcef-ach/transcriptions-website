import { useEffect, useRef, useState } from "react";

export default function YouTubePlayer() {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      console.log("ready");
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "b7Cn9PgUnRg",
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              console.log("▶️ Video is playing");
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              console.log("⏸ Video is paused");
            }
          },
          onPlaybackRateChange: (event) => {
            console.log("⚡ Speed changed to", event.data, "x");
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(Math.floor(playerRef.current.getCurrentTime()));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) =>
    `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;

  return (
    <div>
      {/* YouTube video container */}
      <div id="yt-player"></div>

      {/* Custom controls */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => playerRef.current?.playVideo()}>▶ Play</button>
        <button onClick={() => playerRef.current?.pauseVideo()}>⏸ Pause</button>
        <button
          onClick={() => {
            const current = playerRef.current?.getCurrentTime() || 0;
            playerRef.current?.seekTo(current + 10, true);
          }}
        >
          +10s
        </button>

        <div style={{ marginTop: "10px" }}>
          {formatTime(currentTime)} / {formatTime(Math.floor(duration))}
        </div>

        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            playerRef.current?.seekTo(Number(e.target.value), true);
          }}
        />
      </div>
    </div>
  );
}
