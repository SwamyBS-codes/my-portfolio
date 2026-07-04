import React, { useState } from 'react';
import { ArrowRight, Server, Database, Globe, Network, ShieldCheck, Cpu, User, Lock, GitPullRequest, Container } from 'lucide-react';

const BLUEPRINTS = {
  cloudops: {
    name: "CloudOps Orchestration Workflow",
    description: "Traces the event-driven lifecycle from a developer git push to a fully deployed Docker container via an NGINX hot-reload.",
    defaultNode: "webhook",
    nodes: {
      webhook: {
        title: "GitHub Webhook",
        icon: <GitPullRequest className="w-5 h-5 text-cyan-400" />,
        role: "Event-Driven Pipeline Trigger",
        protocol: "HTTPS POST Webhook",
        details: "Fired automatically on a 'git push' to the repository. Transmits metadata payload along with a secure SHA-256 HMAC signature header for authentication.",
        latency: "Fires instantly"
      },
      receiver: {
        title: "Webhook Receiver",
        icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
        role: "Authentication & Queue Manager",
        protocol: "Node.js / Express.js",
        details: "Validates Webhook authenticity using cryptographic payload matching. Offloads builds to an execution worker pool to ensure instant webhook responses.",
        latency: "1 - 3ms"
      },
      orchestrator: {
        title: "Orchestration Daemon",
        icon: <Cpu className="w-5 h-5 text-purple-400" />,
        role: "Build & Directory Automator",
        protocol: "Bash Scripts / Child Processes",
        details: "Pulls the latest code updates, runs linters, checks environment configurations, and prepares configuration mapping directories on host machine.",
        latency: "100 - 300ms"
      },
      docker: {
        title: "Docker Engine",
        icon: <Container className="w-5 h-5 text-pink-400" />,
        role: "Container Compiler & Supervisor",
        protocol: "Unix IPC Socket / CLI",
        details: "Builds a clean, containerized Docker image using layered caching. Terminates the outdated container instance and launches the new isolated container.",
        latency: "3 - 8s build & run"
      },
      nginx: {
        title: "NGINX Routing",
        icon: <Network className="w-5 h-5 text-blue-400" />,
        role: "Reverse Proxy & Load Balancer",
        protocol: "Upstream Proxying",
        details: "Performs an configuration syntax test and initiates a hot reload. Seamlessly shifts active client traffic lines to the new container with zero downtime.",
        latency: "< 1ms reload"
      },
      container: {
        title: "Live Container",
        icon: <Server className="w-5 h-5 text-emerald-400" />,
        role: "Running App Instance",
        protocol: "Virtual Port Map (3000:3000)",
        details: "Serves the live production build in a secure, isolated sandboxed container with strict memory limits and independent environment bindings.",
        latency: "Active & Healthy"
      }
    },
    layout: [
      { type: 'row', elements: ['webhook', 'receiver', 'orchestrator'] },
      { type: 'row', elements: ['docker', 'nginx', 'container'] }
    ]
  },
  shortify: {
    name: "Shortify Cache-Aside Request Flow",
    description: "Traces how an HTTP client request is served with minimum latency using a memory-first caching layer and indexing.",
    defaultNode: "client",
    nodes: {
      client: {
        title: "Client Browser",
        icon: <Globe className="w-5 h-5 text-cyan-400" />,
        role: "User Interface & Client Logic",
        protocol: "HTTP/2 / HTTPS",
        details: "Initiates request (e.g. creating short links or redirection). Sends authentication JWT inside request headers.",
        latency: "Starts cycle"
      },
      nginx: {
        title: "NGINX Gateway",
        icon: <Network className="w-5 h-5 text-indigo-400" />,
        role: "Reverse Proxy & SSL Termination",
        protocol: "TCP Port 443 ➔ Port 3000",
        details: "Acts as a firewall, rate limiter, and load balancer. Securely forwards authorized traffic to active Node.js Docker containers.",
        latency: "< 1ms overhead"
      },
      node: {
        title: "Node.js API Server",
        icon: <Server className="w-5 h-5 text-purple-400" />,
        role: "Core Application Business Logic",
        protocol: "REST API / Express.js",
        details: "Validates JWTs, handles URL shortening algorithms, updates click analytics, and orchestrates cache checks.",
        latency: "5 - 15ms processing"
      },
      redis: {
        title: "Redis Cache-aside",
        icon: <Database className="w-5 h-5 text-pink-400" />,
        role: "High-Speed In-Memory Caching",
        protocol: "RESP Protocol",
        details: "Stores frequently requested Short URLs. Bypasses primary database lookups for pre-resolved redirects to maximize performance.",
        latency: "1 - 2ms (Cache Hit)"
      },
      postgres: {
        title: "PostgreSQL Database",
        icon: <Database className="w-5 h-5 text-blue-400" />,
        role: "Persistent Storage RDBMS",
        protocol: "SQL / Indexed Queries",
        details: "Stores persistent records of users, URL schemas, and historical logs. Features B-Tree indexing on shortened code hashes.",
        latency: "15 - 40ms (Cache Miss)"
      }
    },
    layout: [
      { type: 'row', elements: ['client', 'nginx', 'node'] },
      { type: 'split', elements: ['redis', 'postgres'] }
    ]
  },
  p2p: {
    name: "P2P Signaling & Direct Transport Flow",
    description: "Traces the transition from server-assisted peer matchmaking to fully decentralized, encrypted WebRTC Data Channel transfers.",
    defaultNode: "peera",
    nodes: {
      peera: {
        title: "Peer A (Sender)",
        icon: <User className="w-5 h-5 text-cyan-400" />,
        role: "Initiator Client Node",
        protocol: "Browser / React WebRTC",
        details: "Slices local files into binary buffer chunks, calculates file hash checksums, and connects to WebSocket signal relay to wait for peers.",
        latency: "Slices buffer"
      },
      signaling: {
        title: "Signaling Server",
        icon: <Network className="w-5 h-5 text-indigo-400" />,
        role: "SDP Handshake Broker",
        protocol: "WebSocket / Socket.io",
        details: "Exchanges SDP Offers, SDP Answers, and candidate listings between peers. Self-terminates signaling relays once P2P link is established.",
        latency: "10 - 25ms exchange"
      },
      stun: {
        title: "STUN / TURN Server",
        icon: <Globe className="w-5 h-5 text-purple-400" />,
        role: "NAT Traversal Utility",
        protocol: "STUN / UDP 3478",
        details: "Resolves public port allocations and IP configurations behind firewalls. Operates as a TURN relay only if strict symmetric NAT prevents P2P lines.",
        latency: "20 - 60ms resolve"
      },
      datachannel: {
        title: "P2P Data Channel",
        icon: <Lock className="w-5 h-5 text-pink-400" />,
        role: "Encrypted Direct Connection",
        protocol: "SCTP over DTLS-SRTP",
        details: "Fully secure, direct data pipe establishing high-speed chunked file transmission directly browser-to-browser, bypassing servers completely.",
        latency: "Direct (0ms server load)"
      },
      peerb: {
        title: "Peer B (Receiver)",
        icon: <User className="w-5 h-5 text-emerald-400" />,
        role: "Receiver & Assembler Node",
        protocol: "Browser / React WebRTC",
        details: "Ingests incoming packets, validates checksum integrity, issues ACK/NACKs for lost chunks, and prompts browser-level file download compilation.",
        latency: "Assembles chunks"
      }
    },
    layout: [
      { type: 'row', elements: ['peera', 'signaling', 'stun'] },
      { type: 'row', elements: ['datachannel', 'peerb'] }
    ]
  }
};

const ArchitectureBlueprint = ({ projectType = 'shortify' }) => {
  const blueprint = BLUEPRINTS[projectType] || BLUEPRINTS.shortify;
  const [selectedNode, setSelectedNode] = useState(blueprint.defaultNode);

  // If node gets mismatched during swap
  const activeNodeKey = blueprint.nodes[selectedNode] ? selectedNode : blueprint.defaultNode;
  const node = blueprint.nodes[activeNodeKey];

  return (
    <div className="mt-6 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 p-5 md:p-6 shadow-2xl">
      {/* Blueprint Header */}
      <div className="mb-6">
        <h4 className="text-sm font-mono font-bold text-gray-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>{blueprint.name}</span>
        </h4>
        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
          {blueprint.description} Click any node below to trace the system lifecycle.
        </p>
      </div>

      {/* Dynamic Graph Layout Rendering */}
      <div className="space-y-4 mb-6">
        {blueprint.layout.map((layoutRow, rIdx) => (
          <div key={rIdx} className="flex flex-col md:flex-row items-center justify-center gap-4">
            {layoutRow.type === 'row' ? (
              layoutRow.elements.map((elKey, eIdx) => {
                const el = blueprint.nodes[elKey];
                const isActive = activeNodeKey === elKey;
                return (
                  <React.Fragment key={elKey}>
                    <button
                      onClick={() => setSelectedNode(elKey)}
                      className={`flex-1 w-full md:w-auto flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gray-900 border-cyan-500/80 shadow-md shadow-cyan-500/5 scale-102 z-10'
                          : 'bg-gray-900/30 border-gray-850 hover:border-gray-700'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-950 flex items-center justify-center mb-2 border border-gray-850">
                        {el.icon}
                      </div>
                      <span className="text-[11px] font-bold text-white">{el.title}</span>
                      <span className="text-[9px] font-mono text-gray-500 mt-0.5">{el.protocol}</span>
                    </button>
                    {eIdx < layoutRow.elements.length - 1 && (
                      <div className="hidden md:flex justify-center text-gray-800 shrink-0">
                        <ArrowRight className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              // Split nodes (like DB / Redis in Shortify)
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {layoutRow.elements.map((elKey) => {
                  const el = blueprint.nodes[elKey];
                  const isActive = activeNodeKey === elKey;
                  return (
                    <button
                      key={elKey}
                      onClick={() => setSelectedNode(elKey)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gray-900 border-cyan-500/80 shadow-md shadow-cyan-500/5 scale-[1.01] z-10'
                          : 'bg-gray-900/30 border-gray-850 hover:border-gray-700'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-950 flex items-center justify-center border border-gray-850 shrink-0">
                        {el.icon}
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-white leading-tight">{el.title}</h5>
                        <p className="text-[9px] text-gray-500 font-mono mt-0.5">{el.protocol}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Node Details Box */}
      {node && (
        <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-850/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-2.5 mb-2.5">
            <h5 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              {node.title}
            </h5>
            <span className="text-[10px] font-mono text-gray-500">
              Protocol: <span className="text-gray-300 font-semibold">{node.protocol}</span>
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-mono">
            <span className="text-cyan-400">Role:</span> {node.role}
          </p>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {node.details}
          </p>
          <div className="mt-3 text-[10px] font-mono text-gray-500 flex justify-between">
            <span>Latency / Speed impact:</span>
            <span className="text-emerald-400 font-bold">{node.latency}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureBlueprint;
