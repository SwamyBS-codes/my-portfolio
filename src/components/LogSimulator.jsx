import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Terminal } from 'lucide-react';

const LOG_TEMPLATES = [
  { type: 'info', text: 'Initializing deployment trigger from GitHub Webhook...' },
  { type: 'success', text: 'Webhook signature verified successfully.' },
  { type: 'info', text: 'Payload: ref="refs/heads/main", repository="SwamyBS-codes/CloudOps"' },
  { type: 'info', text: 'Cloning repository main branch into workspace build-294...' },
  { type: 'success', text: 'Cloned 4.2MB in 0.45s.' },
  { type: 'info', text: 'Searching for Dockerfile...' },
  { type: 'success', text: 'Dockerfile found. Preparing build context.' },
  { type: 'info', text: 'Running: docker build -t cloudops-service:latest .' },
  { type: 'info', text: 'Step 1/6 : FROM node:20-alpine' },
  { type: 'info', text: ' ---> 8a4c84a51bb3' },
  { type: 'info', text: 'Step 2/6 : WORKDIR /usr/src/app' },
  { type: 'info', text: ' ---> Using cache' },
  { type: 'info', text: 'Step 3/6 : COPY package*.json ./' },
  { type: 'info', text: ' ---> Using cache' },
  { type: 'info', text: 'Step 4/6 : RUN npm ci --only=production' },
  { type: 'info', text: ' ---> Running in b47df83c9210' },
  { type: 'info', text: 'added 142 packages in 2.12s' },
  { type: 'info', text: 'Step 5/6 : COPY . .' },
  { type: 'info', text: 'Step 6/6 : EXPOSE 3000' },
  { type: 'success', text: 'Successfully built image cloudops-service:latest (id: 4e7ab2912f)' },
  { type: 'info', text: 'Stopping old container "cloudops-service-prod"...' },
  { type: 'success', text: 'Container stopped.' },
  { type: 'info', text: 'Launching new container: docker run -d --name cloudops-service-prod -p 3000:3000 cloudops-service:latest' },
  { type: 'success', text: 'Container ID: 9f727c62de182a9394838f712a7f' },
  { type: 'info', text: 'Performing HTTP health checks on port 3000...' },
  { type: 'info', text: 'GET http://localhost:3000/health ... Attempt 1/3' },
  { type: 'success', text: 'Health check passed! Status code: 200 OK' },
  { type: 'info', text: 'Regenerating NGINX configuration profiles...' },
  { type: 'info', text: 'Testing NGINX config: nginx -t' },
  { type: 'success', text: 'nginx: the configuration file /etc/nginx/nginx.conf syntax is ok' },
  { type: 'success', text: 'nginx: configuration file /etc/nginx/nginx.conf test is successful' },
  { type: 'info', text: 'Reloading NGINX reverse proxy service...' },
  { type: 'success', text: 'NGINX reloaded. Zero-downtime traffic cutover complete.' },
  { type: 'success', text: 'Deployment completed successfully. Live at: http://cloudops.swamybs.dev' }
];

const LogSimulator = () => {
  const [logs, setLogs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentIndex < LOG_TEMPLATES.length) {
      timer = setTimeout(() => {
        const nextLog = LOG_TEMPLATES[currentIndex];
        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        
        setLogs(prev => [...prev, { ...nextLog, time: timestamp }]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? 300 : Math.random() * 600 + 400); // realistic delays
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex]);

  const handleReset = () => {
    setLogs([]);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="mt-6 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 shadow-2xl flex flex-col h-72">
      {/* Header */}
      <div className="bg-gray-900 px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-gray-300">Live CI/CD Deployment Stream</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? "Pause Stream" : "Play Stream"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-green-400" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Console"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal logs content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-[11px] md:text-xs overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-gray-850"
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 italic text-center py-12">
            Click play or wait for the logs to start streaming...
          </div>
        ) : (
          logs.map((log, index) => {
            let textColor = 'text-gray-300';
            if (log.type === 'success') textColor = 'text-emerald-400';
            if (log.type === 'error') textColor = 'text-red-400';
            
            return (
              <div key={index} className="flex gap-2.5 items-start leading-relaxed">
                <span className="text-gray-600 select-none">[{log.time}]</span>
                <span className={textColor}>
                  {log.type === 'success' ? '✔ ' : log.type === 'error' ? '✘ ' : '$ '}
                  {log.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LogSimulator;
