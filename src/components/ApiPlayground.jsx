import React, { useState } from 'react';
import { Send, Play, Cpu, CheckCircle } from 'lucide-react';

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/v1/links',
    desc: 'Create shortened URL',
    defaultBody: {
      url: 'https://github.com/SwamyBS-codes/CloudOps',
      customAlias: 'cloudops-repo',
      expiryDays: 7
    }
  },
  {
    method: 'GET',
    path: '/api/v1/links/stats/cloudops-repo',
    desc: 'Fetch analytics (Cached)',
    defaultBody: null
  },
  {
    method: 'GET',
    path: '/cloudops-repo',
    desc: 'Resolve and redirect',
    defaultBody: null
  }
];

const ApiPlayground = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [requestBody, setRequestBody] = useState(JSON.stringify(ENDPOINTS[0].defaultBody, null, 2));
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEndpointSelect = (idx) => {
    setActiveIdx(idx);
    setResponse(null);
    if (ENDPOINTS[idx].defaultBody) {
      setRequestBody(JSON.stringify(ENDPOINTS[idx].defaultBody, null, 2));
    } else {
      setRequestBody('');
    }
  };

  const handleSend = () => {
    setLoading(true);
    setResponse(null);

    // Simulate API delay
    const endpoint = ENDPOINTS[activeIdx];
    let delay = 35; // base db latency
    if (endpoint.path.includes('stats')) {
      delay = 2; // Redis cache-hit speed!
    } else if (endpoint.path === '/cloudops-repo') {
      delay = 8; // Cached redirect lookup
    } else if (endpoint.method === 'POST') {
      delay = 48; // DB write + validation latency
    }

    setTimeout(() => {
      let status = 200;
      let bodyData = {};
      let headers = {
        'Content-Type': 'application/json',
        'Server': 'Express/Docker',
        'X-Powered-By': 'NodeJS',
      };

      if (endpoint.method === 'POST') {
        status = 201;
        try {
          const parsed = JSON.parse(requestBody);
          bodyData = {
            success: true,
            message: "Short URL created successfully",
            data: {
              originalUrl: parsed.url || "https://github.com/SwamyBS-codes/CloudOps",
              shortCode: parsed.customAlias || "cloudops-repo",
              shortUrl: `https://shortify-urlshortner.vercel.app/${parsed.customAlias || "cloudops-repo"}`,
              expiryAt: new Date(Date.now() + (parsed.expiryDays || 7) * 24 * 60 * 60 * 1000).toISOString(),
            }
          };
        } catch (e) {
          status = 400;
          bodyData = {
            success: false,
            error: "Bad Request",
            message: "Invalid request payload format."
          };
        }
        headers['X-Cache'] = 'BYPASS (Write-through)';
      } else if (endpoint.path.includes('stats')) {
        status = 200;
        bodyData = {
          success: true,
          data: {
            shortCode: "cloudops-repo",
            totalClicks: 342,
            uniqueVisitors: 289,
            lastAccessed: new Date().toISOString(),
            geoDistribution: { IN: 198, US: 89, DE: 32, Other: 23 },
            browsers: { Chrome: 210, Firefox: 82, Safari: 50 }
          }
        };
        headers['X-Cache'] = 'HIT (Redis Key-Value Cache)';
      } else {
        // GET /cloudops-repo
        status = 302;
        bodyData = {
          success: true,
          redirectTo: "https://github.com/SwamyBS-codes/CloudOps",
          cacheLookup: "Key found in Redis"
        };
        headers['Location'] = "https://github.com/SwamyBS-codes/CloudOps";
        headers['X-Cache'] = 'HIT (Redirect Cached in Memory)';
      }

      setResponse({
        status,
        latency: delay,
        headers,
        body: JSON.stringify(bodyData, null, 2)
      });
      setLoading(false);
    }, 400 + Math.random() * 200); // UI visual feedback delay
  };

  const activeEndpoint = ENDPOINTS[activeIdx];

  return (
    <div className="mt-6 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 p-6 shadow-2xl">
      <div className="mb-4">
        <h4 className="text-sm font-mono font-bold text-gray-300 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Interactive REST API Client Playground</span>
        </h4>
        <p className="text-[11px] text-gray-500 mt-1">
          Select an endpoint to test HTTP transactions, payload structures, and response caching times.
        </p>
      </div>

      {/* Endpoint selection tabs */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        {ENDPOINTS.map((ep, idx) => (
          <button
            key={idx}
            onClick={() => handleEndpointSelect(idx)}
            className={`flex items-center justify-between sm:justify-start gap-2 px-3 py-2 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer ${
              activeIdx === idx
                ? 'bg-gray-900 border-cyan-500/80 text-white'
                : 'bg-gray-900/30 border-gray-850 text-gray-400 hover:border-gray-700'
            }`}
          >
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              ep.method === 'POST' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
            }`}>
              {ep.method}
            </span>
            <span className="text-[11px] font-semibold">{ep.path}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Request Panel */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>REQUEST SCHEMATICS ({activeEndpoint.desc})</span>
            {activeEndpoint.method === 'POST' && <span className="text-cyan-400">JSON Editable</span>}
          </div>
          <div className="bg-gray-900/60 border border-gray-850 rounded-xl overflow-hidden p-4 min-h-[160px] flex flex-col justify-between">
            {activeEndpoint.method === 'POST' ? (
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full h-24 bg-transparent outline-none border-none text-cyan-300 font-mono text-xs leading-relaxed resize-none"
              />
            ) : (
              <div className="text-gray-500 font-mono text-xs italic py-8 text-center">
                This endpoint does not require a request body.
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>{loading ? 'Sending Request...' : 'Send HTTP Request'}</span>
            </button>
          </div>
        </div>

        {/* Response Panel */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>RESPONSE HEADERS & PAYLOAD</span>
            {response && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Done
              </span>
            )}
          </div>
          <div className="bg-gray-900/40 border border-gray-850 rounded-xl p-4 min-h-[160px] flex flex-col justify-between font-mono text-xs relative">
            {response ? (
              <div className="space-y-3">
                {/* Headers / Status Bar */}
                <div className="flex justify-between items-center border-b border-gray-850 pb-2 mb-2">
                  <span className={`font-bold ${
                    response.status >= 300 ? 'text-orange-400' : 'text-emerald-400'
                  }`}>
                    HTTP/1.1 {response.status}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Latency: <span className="text-emerald-400 font-bold">{response.latency}ms</span>
                  </span>
                </div>
                
                {/* Cache Header Detail */}
                <div className="bg-gray-950 px-2.5 py-1.5 rounded border border-gray-850/80 text-[10px] text-gray-400">
                  <span className="text-cyan-400 font-semibold">X-Cache:</span> {response.headers['X-Cache']}
                </div>

                {/* Response Body */}
                <pre className="text-[11px] text-gray-300 leading-relaxed overflow-x-auto max-h-36 scrollbar-thin scrollbar-thumb-gray-850">
                  {response.body}
                </pre>
              </div>
            ) : (
              <div className="text-gray-500 italic py-12 text-center w-full">
                {loading ? 'Executing network lookup...' : 'Click "Send HTTP Request" to inspect outputs...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;
