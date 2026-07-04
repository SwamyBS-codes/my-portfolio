import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, ShieldCheck } from 'lucide-react';

const NETWORK_PRESETS = [
  { label: 'Local LAN (Optimal)', speed: 85.2, rtt: 2, loss: '0.0%', bufferSize: 1024 * 1024 },
  { label: 'Broadband Fiber', speed: 18.5, rtt: 15, loss: '0.05%', bufferSize: 256 * 1024 },
  { label: 'Public Wi-Fi (Congested)', speed: 3.2, rtt: 68, loss: '1.2%', bufferSize: 64 * 1024 },
  { label: 'Cellular 3G (Lossy)', speed: 0.45, rtt: 210, loss: '7.5%', bufferSize: 16 * 1024 }
];

const P2pThroughputSimulator = () => {
  const [networkIdx, setNetworkIdx] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [rttJitter, setRttJitter] = useState(15);
  
  const totalSize = 450; // MB
  const progressInterval = useRef(null);

  const activePreset = NETWORK_PRESETS[networkIdx];

  useEffect(() => {
    // Generate speed fluctuations and RTT jitter when playing
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        const jitter = (Math.random() * 0.2 - 0.1) * activePreset.speed;
        setCurrentSpeed(Math.max(0.01, activePreset.speed + jitter));
        
        const rttOffset = Math.floor(Math.random() * 6 - 3);
        setRttJitter(Math.max(1, activePreset.rtt + rttOffset));
      }, 500);
    } else {
      setCurrentSpeed(0);
    }
    return () => clearInterval(timer);
  }, [isPlaying, networkIdx]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setTransferred((prev) => {
          // speed is in MB/s, interval runs every 100ms
          const increment = (currentSpeed || activePreset.speed) / 10;
          const nextVal = prev + increment;
          if (nextVal >= totalSize) {
            setIsPlaying(false);
            setProgress(100);
            return totalSize;
          }
          setProgress((nextVal / totalSize) * 100);
          return nextVal;
        });
      }, 100);
    } else {
      clearInterval(progressInterval.current);
    }
    return () => clearInterval(progressInterval.current);
  }, [isPlaying, currentSpeed, networkIdx]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setTransferred(0);
    setCurrentSpeed(0);
    setRttJitter(activePreset.rtt);
  };

  const handleNetworkChange = (idx) => {
    setNetworkIdx(idx);
    setRttJitter(NETWORK_PRESETS[idx].rtt);
    if (isPlaying) {
      setCurrentSpeed(NETWORK_PRESETS[idx].speed);
    }
  };

  return (
    <div className="mt-6 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-900 pb-4 mb-4">
        <div>
          <h4 className="text-sm font-mono font-bold text-gray-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>WebRTC Data Channel Throughput Simulator</span>
          </h4>
          <p className="text-[11px] text-gray-500 mt-1">
            Simulate direct SCTP/DTLS binary transfers under real-world network conditions.
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-semibold transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-green-400" />}
            <span>{isPlaying ? 'Pause Transfer' : 'Start Transfer'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-gray-900 border border-gray-850 hover:border-gray-700 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
            title="Reset Simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Network Presets Slider / Selector */}
      <div className="mb-6">
        <label className="text-[10px] font-mono text-gray-500 block mb-2">
          NETWORK TOPOLOGY CONDITION: <span className="text-cyan-400 font-bold">{activePreset.label}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {NETWORK_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleNetworkChange(idx)}
              className={`px-2.5 py-2 rounded-lg border text-center transition-all cursor-pointer ${
                networkIdx === idx
                  ? 'bg-cyan-950/20 border-cyan-500/70 text-white font-semibold'
                  : 'bg-gray-900/40 border-gray-850 text-gray-400 hover:border-gray-750'
              }`}
            >
              <p className="text-[10px] truncate">{preset.label.split(' ')[0]}</p>
              <p className="text-[9px] font-mono text-gray-500 mt-0.5">{preset.speed >= 1 ? `${preset.speed} MB/s` : `${preset.speed * 1000} KB/s`}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Progress display */}
      <div className="bg-gray-900/40 border border-gray-850 rounded-xl p-4 mb-6">
        <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-2">
          <span>File: <strong className="text-white">ubuntu-desktop.iso</strong> (450 MB)</span>
          <span className="text-cyan-400 font-bold">{progress.toFixed(1)}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-gray-950 rounded-full overflow-hidden border border-gray-850">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-900 text-center font-mono text-xs">
          <div>
            <span className="block text-[10px] text-gray-500">SPEED</span>
            <span className="font-bold text-white">
              {isPlaying
                ? currentSpeed >= 1
                  ? `${currentSpeed.toFixed(2)} MB/s`
                  : `${(currentSpeed * 1000).toFixed(0)} KB/s`
                : '0.00 MB/s'}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-gray-500">TRANSFERRED</span>
            <span className="font-bold text-white">
              {transferred.toFixed(1)} / {totalSize} MB
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-gray-500">RTT LATENCY</span>
            <span className="font-bold text-indigo-400">{isPlaying ? `${rttJitter} ms` : `-- ms`}</span>
          </div>
          <div>
            <span className="block text-[10px] text-gray-500">PACKET LOSS</span>
            <span className="font-bold text-red-400">{activePreset.loss}</span>
          </div>
        </div>
      </div>

      {/* DTLS Encryption and SCTP Specs */}
      <div className="p-3 bg-gray-900/60 border border-gray-850 rounded-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[10px] font-mono text-gray-400 leading-normal">
            <span className="text-white font-semibold">Security Tunnel:</span> DTLS 1.3 (TLS_AES_128_GCM_SHA256)
          </div>
        </div>
        <div className="hidden sm:block text-[9px] font-mono text-gray-500 text-right">
          SCTP Buffer: {activePreset.bufferSize / 1024} KB
        </div>
      </div>
    </div>
  );
};

export default P2pThroughputSimulator;
