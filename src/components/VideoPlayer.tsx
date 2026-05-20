import { useState, useRef } from 'react';
import { getVideoUrl } from '../config/storage';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import './VideoPlayer.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const videoUrl = src.startsWith('http') ? src : getVideoUrl(src);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };
  
  return (
    <div className="video-player">
      {title && <h4 className="video-title">{title}</h4>}
      <div className="video-container">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
        
        <div className="video-controls">
          <button className="control-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          
          <button className="control-btn" onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          <button className="control-btn" onClick={handleFullscreen}>
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
