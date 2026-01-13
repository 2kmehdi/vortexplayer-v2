// src/components/AppleTVPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Repeat, Shuffle,
  Heart, ListMusic, Maximize2
} from 'react-icons/lr';

const AppleTVPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Sample track data
  const currentTrack = {
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  };

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  // Handle seek
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  // Simulate audio playback
  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= duration) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  return (
    <div className="apple-tv-player">
      {/* Background */}
      <div className="background">
        <div 
          className="bg-image"
          style={{
            backgroundImage: `url(${currentTrack.cover})`,
            opacity: 0.3
          }}
        />
        <div className="bg-overlay" />
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Album Art */}
        <motion.div 
          className="album-art"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            duration: 20, 
            repeat: isPlaying ? Infinity : 0,
            ease: "linear"
          }}
        >
          <img src={currentTrack.cover} alt={currentTrack.album} />
        </motion.div>

        {/* Track Info */}
        <div className="track-info">
          <h1 className="track-title">{currentTrack.title}</h1>
          <p className="track-artist">{currentTrack.artist}</p>
          <p className="track-album">{currentTrack.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="time">{formatTime(currentTime)}</div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="progress-slider"
          />
          <div className="time">{formatTime(duration)}</div>
        </div>

        {/* Controls */}
        <div className="controls">
          {/* Left Controls */}
          <div className="control-group">
            <button className="control-btn">
              <Shuffle size={24} />
            </button>
            <button className="control-btn">
              <SkipBack size={28} />
            </button>
          </div>

          {/* Play/Pause */}
          <motion.button
            className="play-btn"
            onClick={handlePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={40} /> : <Play size={40} />}
          </motion.button>

          {/* Right Controls */}
          <div className="control-group">
            <button className="control-btn">
              <SkipForward size={28} />
            </button>
            <button className="control-btn">
              <Repeat size={24} />
            </button>
          </div>
        </div>

        {/* Volume Control */}
        <div className="volume-control">
          <button 
            className="mute-btn"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>

        {/* Additional Options */}
        <div className="options">
          <button className="option-btn">
            <Heart size={20} />
          </button>
          <button className="option-btn">
            <ListMusic size={20} />
          </button>
          <button className="option-btn">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppleTVPlayer;