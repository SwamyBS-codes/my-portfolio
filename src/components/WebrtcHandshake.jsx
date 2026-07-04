import React, { useState } from 'react';
import { Network, Server, ArrowRight, User, Play, RotateCcw } from 'lucide-react';

const HANDSHAKE_STEPS = [
  {
    title: "1. Join Socket Room",
    role: "WebSocket Brokerage",
    description: "Peers establish a persistent connection to the Socket.io signaling server and join a shared room coordinate to discover each other.",
    activeFlow: { from: "peers", to: "server", label: "ws.emit('join-room')" },
    logs: [
      "[12:28:01] [WebSocket] Establishing connection to ws://signal.swamybs.dev...",
      "[12:28:01] [WebSocket] Connected. Assigned socket_id: usr_A3fB9",
      "[12:28:02] [Signaling] joining room 'shared-7411'",
      "[12:28:02] [Signaling] Room joined. Peers connected: 2"
    ]
  },
  {
    title: "2. Generate SDP Offer",
    role: "Local Session config",
    description: "Peer A creates a local session description (SDP Offer) specifying media codecs, DTLS fingerprint signatures, and transport configurations, then relays it to the server.",
    activeFlow: { from: "peera", to: "server", label: "transmitting SDP Offer" },
    logs: [
      "[12:28:03] [Peer A] client: peerConnection.createOffer()",
      "[12:28:03] [Peer A] Success. Local SDP Offer generated (v=0\\no=- 874312...)",
      "[12:28:03] [Peer A] setting local description: peerConnection.setLocalDescription(offer)",
      "[12:28:04] [WebSocket] socket.emit('relay-sdp', { target: 'peerB', sdp: offer })"
    ]
  },
  {
    title: "3. Generate SDP Answer",
    role: "Session Negotiation",
    description: "Peer B receives Peer A's offer, binds it as the remote configuration description, generates a corresponding local SDP Answer, and relays it back.",
    activeFlow: { from: "server", to: "peerb", label: "relaying SDP Answer" },
    logs: [
      "[12:28:05] [Peer B] WebSocket: received 'relay-sdp' offer payload",
      "[12:28:05] [Peer B] setting remote description: peerConnection.setRemoteDescription(offer)",
      "[12:28:05] [Peer B] client: peerConnection.createAnswer()",
      "[12:28:06] [Peer B] setting local description: peerConnection.setLocalDescription(answer)",
      "[12:28:06] [WebSocket] socket.emit('relay-sdp', { target: 'peerA', sdp: answer })"
    ]
  },
  {
    title: "4. ICE Candidate Exchange",
    role: "NAT Traversal & Routing",
    description: "Both peers query public STUN servers to discover their public-facing IP addresses and port mappings, exchanging ICE candidate lists to find the optimal direct routing path.",
    activeFlow: { from: "stun", to: "peers", label: "gathering public reflex IPs" },
    logs: [
      "[12:28:07] [ICE Engine] Querying STUN server stun.l.google.com:19302...",
      "[12:28:07] [Peer A] Gathered candidate: candidate:1 typ srflx raddr 192.168.1.10 rport 50212",
      "[12:28:08] [Peer B] Gathered candidate: candidate:2 typ srflx raddr 10.0.0.4 rport 62130",
      "[12:28:08] [Signaling] Relaying candidates...",
      "[12:28:09] [ICE Engine] Optimal pathway established: UDP 104.244.42.1:50212 ➔ UDP 157.45.2.14:62130"
    ]
  },
  {
    title: "5. SCTP Channel Open",
    role: "Direct Link Established",
    description: "Peers verify session matches. A direct, point-to-point SCTP Data Channel is opened over secure DTLS. WebSocket signaling disconnects as communication runs fully serverless.",
    activeFlow: { from: "peera", to: "peerb", label: "P2P Data Channel CONNECTED" },
    logs: [
      "[12:28:10] [Peer Connection] connectionStateChange: 'connecting'",
      "[12:28:10] [Peer Connection] DTLS Handshake complete. Cipher: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
      "[12:28:11] [Peer Connection] connectionStateChange: 'connected'",
      "[12:28:11] [Data Channel] SCTP Channel opened. MTU size: 1200 bytes.",
      "[SUCCESS] WebRTC connection established. Zero-server binary transfer ready!"
    ]
  }
];

const WebrtcHandshake = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const step = HANDSHAKE_STEPS[currentStep];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, HANDSHAKE_STEPS.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  // Helper to determine graphic arrow highlights
  const { from, to, label } = step.activeFlow;

  return (
    <div className="mt-6 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 p-6 shadow-2xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-900 pb-4 mb-4">
        <div>
          <h4 className="text-sm font-mono font-bold text-gray-200 flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>WebRTC P2P Signaling & Handshake console</span>
          </h4>
          <p className="text-[11px] text-gray-500 mt-1">
            Step-by-step visualization of SDP exchange and NAT routing pathway construction.
          </p>
        </div>

        {/* Wizard Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-2.5 py-1.5 rounded bg-gray-900 border border-gray-850 text-[10px] text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors font-mono cursor-pointer"
          >
            &lt; Prev Step
          </button>
          <button
            onClick={currentStep === HANDSHAKE_STEPS.length - 1 ? handleReset : handleNext}
            className="px-2.5 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 hover:bg-cyan-500/20 transition-all font-mono flex items-center gap-1 cursor-pointer"
          >
            {currentStep === HANDSHAKE_STEPS.length - 1 ? (
              <>
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-green-400" />
                <span>Next Step</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stepper bar */}
      <div className="grid grid-cols-5 gap-1.5 mb-6">
        {HANDSHAKE_STEPS.map((hStep, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <div key={idx} className="flex flex-col gap-1.5 cursor-pointer" onClick={() => setCurrentStep(idx)}>
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-500'
                    : isCompleted
                    ? 'bg-indigo-500/80'
                    : 'bg-gray-900 border border-gray-850'
                }`}
              />
              <span className={`text-[8px] font-mono font-medium hidden sm:block truncate ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {hStep.title.split(' ')[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Visual Connection Diagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
        {/* Connection topology flow map */}
        <div className="md:col-span-7 bg-gray-900/30 border border-gray-850 rounded-xl p-5 relative overflow-hidden min-h-[140px] flex items-center justify-center">
          <div className="w-full flex items-center justify-between max-w-sm relative z-10 px-4">
            
            {/* Peer A Node */}
            <div className={`flex flex-col items-center gap-1 transition-transform ${from === 'peera' || from === 'peers' ? 'scale-105' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                from === 'peera' || to === 'peera'
                  ? 'bg-cyan-950/40 border-cyan-400/80 text-cyan-400'
                  : 'bg-gray-950 border-gray-850 text-gray-500'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-semibold text-white">Peer A (Sender)</span>
            </div>

            {/* Signaling Server / STUN Relays Node (Central) */}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                to === 'server' || from === 'server' || to === 'stun'
                  ? 'bg-indigo-950/40 border-indigo-400/80 text-indigo-400'
                  : 'bg-gray-950 border-gray-850 text-gray-500'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-semibold text-white">
                {currentStep === 3 ? "STUN Server" : "Signal Server"}
              </span>
            </div>

            {/* Peer B Node */}
            <div className={`flex flex-col items-center gap-1 transition-transform ${to === 'peerb' || from === 'peers' ? 'scale-105' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                to === 'peerb' || from === 'peerb'
                  ? 'bg-cyan-950/40 border-cyan-400/80 text-cyan-400'
                  : 'bg-gray-950 border-gray-850 text-gray-500'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-semibold text-white">Peer B (Receiver)</span>
            </div>
          </div>

          {/* Overlay connection trace arrows (visually represented) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {from === 'peers' && (
              <div className="text-[9px] font-mono text-cyan-400/80 bg-cyan-950/80 px-2 py-0.5 border border-cyan-500/20 rounded-md animate-pulse">
                {label}
              </div>
            )}
            {from === 'peera' && to === 'server' && (
              <div className="w-[45%] h-0.5 bg-cyan-500 absolute left-[15%] top-1/2 -translate-y-1/2 flex items-center justify-end">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 translate-x-1" />
              </div>
            )}
            {from === 'server' && to === 'peerb' && (
              <div className="w-[45%] h-0.5 bg-indigo-500 absolute right-[15%] top-1/2 -translate-y-1/2 flex items-center justify-end">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 translate-x-1" />
              </div>
            )}
            {from === 'stun' && (
              <div className="w-[80%] h-0.5 border-t border-dashed border-purple-500 absolute top-1/3 flex items-center justify-center">
                <span className="text-[8px] font-mono text-purple-400 bg-gray-950 px-1">{label}</span>
              </div>
            )}
            {from === 'peera' && to === 'peerb' && (
              <div className="w-[70%] h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 absolute bottom-6 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">{label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Textual Description panel */}
        <div className="md:col-span-5 space-y-2">
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-gray-900 border border-gray-850 text-gray-500 uppercase tracking-wider">
            {step.role}
          </span>
          <h5 className="text-xs font-bold text-white font-mono mt-1">{step.title}</h5>
          <p className="text-xs text-gray-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="bg-gray-950 border border-gray-900 rounded-xl p-4 font-mono text-[11px] leading-relaxed shadow-inner">
        <div className="flex items-center gap-1.5 border-b border-gray-900 pb-2 mb-2 text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
          <span className="ml-1 text-[10px]">Session Logs</span>
        </div>
        <div className="space-y-1 h-28 overflow-y-auto pr-2 scrollbar-thin">
          {step.logs.map((log, idx) => {
            const isSuccess = log.startsWith('[SUCCESS]');
            return (
              <div
                key={idx}
                className={isSuccess ? "text-emerald-400 font-bold" : "text-gray-400"}
              >
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WebrtcHandshake;
