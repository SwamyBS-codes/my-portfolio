// Swamy B S Portfolio AI Resume Knowledge Base & Live LLM (Gemini / OpenAI) Service

export const RESUME_SYSTEM_PROMPT = `
You are Swamy's Portfolio AI, an expert AI assistant modeled like ChatGPT and Gemini, specialized in Swamy B S's software engineering background, technical projects, code architecture, and accomplishments.

You have complete, verified, authoritative knowledge about Swamy B S:

### CANDIDATE PROFILE:
- Full Name: Swamy B S
- Current Role: Systems & Software Engineer (Undergraduate at RVCE)
- Location: Bengaluru, Karnataka, India
- Email: swamybs272@gmail.com
- Phone: +91 74114 76941
- GitHub: https://github.com/SwamyBS-codes
- LinkedIn: https://linkedin.com/in/swamy-b-s-86613628b
- LeetCode: https://leetcode.com/u/SwamyBS18
- Career Status: Actively seeking Software Engineering (SDE) Internships & Full-Time Systems/Backend Engineering Roles.

### ACADEMIC RECORD:
1. R V College of Engineering (RVCE), Bengaluru (Sept 2023 – June 2027)
   - Degree: Bachelor of Engineering (B.E.) in Information Science and Engineering
   - Undergrad CGPA: 8.48 / 10.0
   - Core Coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems (DBMS), Object-Oriented Programming (OOP), System Design.
2. GIPUC Channarayapattana, Hassan, Karnataka (March 2021 – June 2023)
   - Pre-University Course (PCMB)
   - Distinction: 94.6% (Top percentile in Physics, Chemistry, Mathematics, Biology)

### TECHNICAL SKILLS:
- Programming Languages: C++, C, JavaScript (ES6+), Python, SQL
- Frontend: React.js, Tailwind CSS, Vite, HTML5, CSS3, Recharts
- Backend & Protocols: Node.js, Express.js, WebRTC DataChannels, Socket.io, RESTful APIs, JWT Authentication
- Databases & Caching: PostgreSQL (B-Tree indexing, query optimization), Redis (In-memory cache-aside), MongoDB (Document modelling), MySQL
- Cloud & Infrastructure: AWS (EC2, ECR, S3), Docker, NGINX Reverse Proxy, Linux / Bash Scripting, Vercel
- Developer Tooling: Git, GitHub & Webhooks, Postman, Web Workers
- Core Computer Science:
  * Data Structures & Algorithms (Greedy, Dynamic Programming, Graphs, Trees, Heaps)
  * Operating Systems (Multi-threading, Process Scheduling, Virtual Memory, IPC)
  * Computer Networks (TCP/IP, UDP, WebSockets, WebRTC, STUN/TURN, HTTP/HTTPS)
  * DBMS (ACID, Normalization, Indexing strategies, Query execution plans)
  * Object-Oriented Design (SOLID principles, clean modular abstractions)

### FLAGSHIP PROJECTS ARCHITECTURE:
1. CloudOps — Automated CI/CD Deployment Platform for AWS
   - Tech: Node.js, Docker, AWS EC2, Amazon ECR, Socket.io, GitHub Webhooks, Bash
   - Architecture & Impact:
     * Developed an automated self-service CI/CD deployment pipeline that slashed staging times from ~20 minutes of manual setup to under 60 seconds.
     * Automated Dockerfile compilation with 3 production-grade safeguards: non-root user execution, active container health checks, and graceful shutdown signal handling (SIGTERM/SIGINT).
     * Integrated Amazon ECR container publishing with automated AWS EC2 instance pull, zero-downtime hot reload, and NGINX reverse proxy configuration.
     * Configured GitHub Webhook receivers to trigger instant deploys on push, streaming deployment logs in real time via Socket.io with sensitive token masking.
   - GitHub: https://github.com/SwamyBS-codes/CloudOps

2. PeerShare — Real-Time WebRTC P2P Communication Platform
   - Tech: WebRTC DataChannels, Node.js, Socket.io, React.js, JavaScript, Web Workers
   - Architecture & Impact:
     * Engineered a decentralized browser-to-browser peer-to-peer file sharing and video communication platform using WebRTC DataChannels, eliminating central storage bandwidth and storage costs.
     * Developed a low-latency Node.js signaling server with Socket.io handling peer discovery, SDP offer/answer exchange, and ICE candidate negotiation with STUN/TURN fallback.
     * Implemented chunked 64KB resumable file transfers with SHA-256 integrity verification and adaptive flow control to guarantee zero packet loss over unstable networks.
     * Offloaded cryptographic checksum hashing to Web Workers to ensure an uninterrupted 60 FPS UI experience during multi-gigabyte transfers.
   - GitHub: https://github.com/SwamyBS-codes/PeerShare
   - Live Demo: https://peersharep2p.vercel.app/

3. Shortify — High-Throughput URL Shortening Platform
   - Tech: React.js, Node.js, Express.js, PostgreSQL, Redis, JWT, Docker, Tailwind CSS
   - Architecture & Impact:
     * Custom aliases, password protection, expiration scheduling, and automated QR code generation.
     * PostgreSQL B-tree indexing with Redis cache-aside layer achieving sub-millisecond redirects and reducing DB load by >80%.
     * Real-time analytics dashboard with React & Recharts for click volume and geographic insights.
   - GitHub: https://github.com/SwamyBS-codes/Shortify
   - Live Demo: https://shortify-urlshortner.vercel.app/

### COMPETITIVE ACHIEVEMENTS & HONORS:
- 🏆 Runner-Up — Coding Chef (May 2026), Nagarjuna College of Engineering, Bengaluru. Multi-tier DP and greedy algorithmic tournament under strict timer.
- 🥇 Runner-Up — Inter-College Coding Competition (Sept 2025), KLE Institutions, Bengaluru. High-speed algorithm formulation and edge-case handling.
- 📜 Introduction to Graph Algorithms Certification (NPTEL, April 2025): Shortest path (Dijkstra, Bellman-Ford), MST (Prim's, Kruskal's), topological sorting, complexity analysis.
- ⚔️ Active LeetCode Problem Solver: Profile at https://leetcode.com/u/SwamyBS18.

### BEHAVIORAL & RESPONSE GUIDELINES:
- You can answer ANY question the user asks — technical, conceptual, behavioral, architectural, or coding.
- Always be technically sharp, clear, helpful, and concise.
- When answering questions about Swamy's work, speak with high fidelity about his design decisions, trade-offs, and metrics.
- When asked coding challenges or system design questions, provide clean, idiomatic code examples with time/space complexity analysis.
- If asked general software engineering or tech questions outside Swamy's resume, answer accurately and thoroughly like ChatGPT / Gemini, drawing analogies to Swamy's tech stack (e.g., Docker, WebRTC, Redis, AWS) where relevant.
- Never invent false experiences or certifications.
- Format responses cleanly with Markdown: use headings (###), bold text, bullet points, and code blocks with syntax highlighting.
`;

const LOCAL_STORAGE_KEY = 'SWAMY_PORTFOLIO_AI_CONFIG';

// Helper to retrieve saved AI configuration
export function getActiveAiConfig() {
  let savedConfig = null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) savedConfig = JSON.parse(raw);
  } catch (e) {
    // Ignore storage parse issues
  }

  // Detect environment variables from Vite
  const envGeminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const envOpenAiKey = import.meta.env.VITE_OPENAI_API_KEY || '';

  const apiKey = savedConfig?.apiKey || envGeminiKey || envOpenAiKey || '';
  
  let provider = savedConfig?.provider;
  if (!provider) {
    if (apiKey.startsWith('AIza') || apiKey.startsWith('AQ') || envGeminiKey) {
      provider = 'gemini';
    } else if (apiKey.startsWith('sk-') || envOpenAiKey) {
      provider = 'openai';
    } else {
      provider = 'gemini'; // default
    }
  }

  const model = savedConfig?.model || (provider === 'openai' ? 'gpt-4o-mini' : 'gemini-1.5-flash');

  return {
    apiKey,
    provider,
    model,
    hasKey: Boolean(apiKey && apiKey.trim().length > 5)
  };
}

// Helper to persist AI configuration to localStorage
export function saveActiveAiConfig({ apiKey, provider, model }) {
  try {
    const cleanKey = (apiKey || '').trim();
    let detectedProvider = provider;
    if (!detectedProvider) {
      if (cleanKey.startsWith('AIza') || cleanKey.startsWith('AQ')) detectedProvider = 'gemini';
      else if (cleanKey.startsWith('sk-')) detectedProvider = 'openai';
      else detectedProvider = 'gemini';
    }

    const payload = {
      apiKey: cleanKey,
      provider: detectedProvider,
      model: model || (detectedProvider === 'openai' ? 'gpt-4o-mini' : 'gemini-1.5-flash')
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    return payload;
  } catch (e) {
    console.error('Failed to save AI config to localStorage', e);
    return null;
  }
}

// Clear stored API Key
export function clearActiveAiConfig() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}

// Cached working Gemini model configuration for active session
let cachedWorkingGeminiConfig = null;

// Core LLM Call: Google Gemini with Dynamic Model Discovery & Resilient Fallback
async function callGeminiApi({ apiKey, messages }) {
  const cleanKey = apiKey.trim();

  // Filter out any initial welcome message so first message has role "user"
  const historyContents = messages
    .filter((msg, idx) => !(idx === 0 && msg.sender === 'ai'))
    .map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

  if (historyContents.length === 0) {
    throw new Error('No user prompt provided to Gemini.');
  }

  const candidatesToTry = [];

  // 1. If we already found a working configuration in this session, try it first
  if (cachedWorkingGeminiConfig) {
    candidatesToTry.push(cachedWorkingGeminiConfig);
  }

  // 2. Discover models available for this API key via ModelService.ListModels
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`);
    if (listRes.ok) {
      const listData = await listRes.json();
      const discovered = (listData.models || [])
        .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .map(m => ({
          model: m.name.replace(/^models\//, ''),
          version: 'v1beta'
        }));

      // Prioritize flash models and modern Gemini 2.0 / 1.5 variants
      discovered.sort((a, b) => {
        const score = (name) => {
          if (name.includes('gemini-2.0-flash')) return 100;
          if (name.includes('gemini-1.5-flash-latest')) return 95;
          if (name.includes('gemini-1.5-flash')) return 90;
          if (name.includes('gemini-2.0')) return 85;
          if (name.includes('gemini-1.5-pro')) return 80;
          if (name.includes('flash')) return 70;
          if (name.includes('pro')) return 60;
          return 10;
        };
        return score(b.model) - score(a.model);
      });

      for (const item of discovered) {
        if (!candidatesToTry.some(c => c.model === item.model && c.version === item.version)) {
          candidatesToTry.push(item);
        }
      }
    }
  } catch (err) {
    console.warn('ListModels check skipped:', err);
  }

  // 3. Fallback candidates if ListModels returned nothing or was restricted
  const standardFallbacks = [
    { model: 'gemini-2.0-flash', version: 'v1beta' },
    { model: 'gemini-1.5-flash-latest', version: 'v1beta' },
    { model: 'gemini-1.5-flash', version: 'v1beta' },
    { model: 'gemini-2.0-flash-exp', version: 'v1beta' },
    { model: 'gemini-1.5-pro-latest', version: 'v1beta' },
    { model: 'gemini-1.5-pro', version: 'v1beta' },
    { model: 'gemini-pro', version: 'v1beta' },
    { model: 'gemini-1.5-flash', version: 'v1' },
    { model: 'gemini-pro', version: 'v1' }
  ];

  for (const fb of standardFallbacks) {
    if (!candidatesToTry.some(c => c.model === fb.model && c.version === fb.version)) {
      candidatesToTry.push(fb);
    }
  }

  let lastError = null;

  // 4. Try candidate models in order until one succeeds
  for (const candidate of candidatesToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/${candidate.version}/models/${candidate.model}:generateContent?key=${cleanKey}`;

    const requestBody = {
      contents: historyContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500
      }
    };

    if (candidate.version === 'v1beta') {
      requestBody.system_instruction = {
        parts: [{ text: RESUME_SYSTEM_PROMPT }]
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        const errorMsg = errorJson?.error?.message || `HTTP ${response.status} (${response.statusText})`;
        lastError = new Error(errorMsg);

        // If it's a 404 or "not found" / "not supported" error, try next candidate
        if (response.status === 404 || errorMsg.includes('not found') || errorMsg.includes('not supported')) {
          console.warn(`Gemini model ${candidate.model} (${candidate.version}) not available, trying next...`);
          continue;
        }

        // If it's a fundamental API key failure, halt and report
        if (response.status === 400 && (errorMsg.includes('API key') || errorMsg.includes('INVALID'))) {
          throw new Error(errorMsg);
        }

        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        cachedWorkingGeminiConfig = candidate;
        return {
          text,
          modelUsed: `${candidate.model}`
        };
      }
    } catch (err) {
      lastError = err;
      if (err.message?.includes('API key not valid')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('No available Gemini model supported for generateContent with this key.');
}

// Core LLM Call: OpenAI (chat/completions REST)
async function callOpenAiApi({ apiKey, model = 'gpt-4o-mini', messages }) {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const formattedMessages = [
    { role: 'system', content: RESUME_SYSTEM_PROMPT },
    ...messages
      .filter((msg, idx) => !(idx === 0 && msg.sender === 'ai'))
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
  ];

  const requestBody = {
    model: model || 'gpt-4o-mini',
    messages: formattedMessages,
    temperature: 0.7,
    max_tokens: 1500
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const errorMessage = errorJson?.error?.message || `OpenAI API returned HTTP status ${response.status} (${response.statusText})`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content;

  if (!responseText) {
    throw new Error('OpenAI returned an empty response. Please check your prompt or try again.');
  }

  return responseText;
}

// Universal AI Completion Dispatcher
export async function sendChatMessageToAi(messages) {
  const config = getActiveAiConfig();

  // If an API key is available, execute the live LLM call
  if (config.hasKey) {
    try {
      if (config.provider === 'openai') {
        const result = await callOpenAiApi({
          apiKey: config.apiKey,
          model: config.model || 'gpt-4o-mini',
          messages
        });
        return { text: result, source: 'openai', model: config.model || 'gpt-4o-mini' };
      } else {
        // Default: Google Gemini with dynamic model discovery & fallback
        const result = await callGeminiApi({
          apiKey: config.apiKey,
          messages
        });
        return { text: result.text, source: 'gemini', model: result.modelUsed };
      }
    } catch (err) {
      console.warn('Live LLM call encountered an issue, falling back to local resume engine:', err);
      // Return clear error message with option to fix or fallback
      const fallbackText = generateAiResponse(messages[messages.length - 1]?.text || '');
      return {
        text: `> ⚠️ **Live LLM Note**: ${err.message}\n\n*Falling back to local resume knowledge base:*\n\n${fallbackText}`,
        source: 'fallback',
        error: err.message
      };
    }
  }

  // If no API key is yet configured, use the built-in offline resume knowledge engine
  const lastUserMessage = messages[messages.length - 1]?.text || '';
  const responseText = generateAiResponse(lastUserMessage);

  return {
    text: responseText,
    source: 'offline-engine',
    isOfflineNotice: true
  };
}

// Fast Offline Knowledge Base Fallback Engine
export function generateAiResponse(userMessage) {
  const query = userMessage.toLowerCase().trim();

  // 1. CloudOps Project Inquiry
  if (
    query.includes('cloudops') || 
    (query.includes('cicd') || query.includes('ci/cd') || query.includes('deployment platform') || query.includes('pipeline'))
  ) {
    return `### **CloudOps — Automated CI/CD Deployment Platform for AWS**

**CloudOps** is Swamy's self-service container deployment platform designed to eliminate manual deployment steps and maintain environment parity across cloud runtimes:

* **Automated 4-Step Pipeline**: Automatically executes on \`git push\` via GitHub Webhooks:
  1. Clones the GitHub repository securely.
  2. Compiles a production-grade Docker container image.
  3. Publishes the image to **Amazon ECR** (Elastic Container Registry).
  4. Pulls and deploys the container onto an **AWS EC2** instance with an NGINX hot reload.
* **3 Production Safeguards**:
  * **Non-root user execution** inside the container to prevent privilege escalation.
  * **Active health check probes** verifying HTTP readiness before routing traffic.
  * **Graceful shutdown handling** (SIGTERM/SIGINT) ensuring existing client requests finish before restart.
* **Real-Time Telemetry**: Streams live build and deployment logs to the client using **Socket.io**, with automatic masking of sensitive credentials and secrets.
* **Speed Impact**: Reduced deployment time from ~20 minutes of manual configuration to under 60 seconds!
* **Tech Stack**: Node.js, Docker, AWS EC2, Amazon ECR, Socket.io, GitHub Webhooks, Bash.
* **Source Code**: [GitHub Repository](https://github.com/SwamyBS-codes/CloudOps)`;
  }

  // 2. PeerShare / WebRTC Inquiry
  if (
    query.includes('peershare') || 
    query.includes('webrtc') || 
    query.includes('p2p') || 
    query.includes('file share') || 
    query.includes('file sharing')
  ) {
    return `### **PeerShare — Real-Time WebRTC P2P Communication Platform**

**PeerShare** is a decentralized browser-to-browser communication platform engineered by Swamy:

* **Zero Central Server Dependency**: Direct peer-to-peer file transfer and video calling via **WebRTC DataChannels**, avoiding expensive bandwidth and storage costs on a central server.
* **Signaling Server**: Custom **Node.js** signaling server built with **Socket.io** handling room discovery, SDP (Session Description Protocol) offer/answer exchanges, and ICE candidates with STUN/TURN fallback.
* **Resilient Transfers**:
  * Implemented **64KB chunking** with adaptive flow control for reliable transmission over unstable networks.
  * **SHA-256 cryptographic checksums** verify file integrity upon completion.
* **Web Worker Multithreading**: Offloads chunk hashing to background Web Workers, maintaining a smooth 60 FPS user interface even when transferring multi-gigabyte files.
* **Tech Stack**: WebRTC DataChannels, Node.js, Socket.io, React.js, JavaScript, Web Workers.
* **Links**: [Live Demo](https://peersharep2p.vercel.app/) • [GitHub Repository](https://github.com/SwamyBS-codes/PeerShare)`;
  }

  // 3. Shortify Inquiry
  if (
    query.includes('shortify') || 
    query.includes('url shortener') || 
    query.includes('redis')
  ) {
    return `### **Shortify — High-Throughput URL Shortening Platform**

**Shortify** is a distributed URL platform optimized for sub-millisecond response latency:

* **Cache-Aside Architecture**: Combines **PostgreSQL B-Tree indexing** with an in-memory **Redis** cache-aside layer. Frequently accessed short links resolve directly from memory in < 1ms, reducing database queries by over 80%.
* **Core Features**: Custom URL slugs, password-protected links, automatic expiration dates, and QR code generation.
* **Analytics Dashboard**: Real-time click analytics visualizer built with **React** and **Recharts**, showing visitor referrals, devices, and geographic insights.
* **Security**: JWT role-based authentication and rate limiting to prevent spam.
* **Tech Stack**: React.js, Node.js, Express.js, PostgreSQL, Redis, Docker, Tailwind CSS.
* **Links**: [Live Application](https://shortify-urlshortner.vercel.app/) • [GitHub Repository](https://github.com/SwamyBS-codes/Shortify)`;
  }

  // 5. All Projects Overview
  if (
    query.includes('project') || 
    query.includes('portfolio work') || 
    query.includes('what has he built') || 
    query.includes('applications')
  ) {
    return `### **Swamy B S — Featured Systems & Projects**

Swamy has engineered four major systems spanning cloud automation, distributed P2P protocols, and high-concurrency databases:

1. **CloudOps (AWS Automated CI/CD Platform)**:
   * 4-step pipeline: Git clone ➔ Docker build ➔ ECR push ➔ EC2 deployment in <60s.
   * Non-root security, health checks, Socket.io live logs.
   * *Stack: Node.js, Docker, AWS EC2, Amazon ECR, Socket.io, NGINX.*

2. **PeerShare (Real-Time WebRTC P2P Platform)**:
   * Direct browser-to-browser file transfers and video calling without centralized storage.
   * 64KB chunking, SHA-256 verification, Web Worker offloading.
   * *Stack: WebRTC DataChannels, Node.js, Socket.io, React.js.*

3. **Shortify (High-Throughput URL Shortener)**:
   * Sub-millisecond redirects using PostgreSQL indexing and Redis cache-aside architecture.
   * *Stack: React.js, Node.js, PostgreSQL, Redis, Docker, JWT.*

*Would you like a technical deep-dive into any specific project?*`;
  }

  // 6. Skills & Tech Stack Inquiry
  if (
    query.includes('skill') || 
    query.includes('stack') || 
    query.includes('technolog') || 
    query.includes('language') || 
    query.includes('tools') ||
    query.includes('frontend') ||
    query.includes('backend') ||
    query.includes('database') ||
    query.includes('cloud')
  ) {
    return `### **Swamy B S — Technical Stack & Competencies**

Swamy's technical capabilities are structured into distinct architectural layers:

* **Programming Languages**: C++, C, JavaScript (ES6+), Python, SQL.
* **Backend & Systems**: Node.js, Express.js, WebRTC DataChannels, Socket.io, REST APIs, JWT Authentication.
* **Cloud & DevOps**: AWS (EC2, ECR, S3), Docker, NGINX Reverse Proxy, Linux / Bash Scripting, Vercel.
* **Databases & Cache**: PostgreSQL (B-Tree indexing), Redis (Cache-aside), MongoDB, MySQL.
* **Frontend**: React.js, Tailwind CSS, Vite, HTML5, CSS3, Recharts.
* **Developer Tooling**: Git, GitHub & Webhooks, Postman, Web Workers.
* **Core Computer Science Foundations**:
  * Data Structures & Algorithms (Greedy, DP, Graph Traversals, Shortest Paths)
  * Operating Systems (Concurrency, Process Sync, Virtual Memory)
  * Computer Networks (TCP/IP, WebSockets, WebRTC, STUN/TURN, HTTP/HTTPS)
  * DBMS (ACID properties, Normalization, Indexing)
  * Object-Oriented Design (SOLID principles, clean architecture in C++ & JS)`;
  }

  // 7. Education / Academics / College Inquiry
  if (
    query.includes('education') || 
    query.includes('college') || 
    query.includes('rvce') || 
    query.includes('cgpa') || 
    query.includes('school') || 
    query.includes('gpa') ||
    query.includes('university')
  ) {
    return `### **Academic Background & Education**

* **R V College of Engineering (RVCE), Bengaluru** (Sept 2023 – June 2027):
  * **Degree**: Bachelor of Engineering (B.E.) in Information Science and Engineering.
  * **Current CGPA**: **8.48 / 10.0**
  * **Key Subjects**: Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems, System Design, Object-Oriented Programming.

* **GIPUC Channarayapattana, Hassan, Karnataka** (March 2021 – June 2023):
  * **Pre-University (PCMB)**
  * **Merit Score**: **94.6%** with distinction in Physics, Chemistry, Mathematics, and Biology.`;
  }

  // 8. Achievements / Competitions / LeetCode
  if (
    query.includes('achievement') || 
    query.includes('competition') || 
    query.includes('contest') || 
    query.includes('leetcode') || 
    query.includes('trophy') || 
    query.includes('award') || 
    query.includes('nptel') ||
    query.includes('certif')
  ) {
    return `### **Competitions & Academic Achievements**

* 🏆 **Runner-Up — Coding Chef (May 2026)**:
  * Held at Nagarjuna College of Engineering, Bengaluru.
  * Conquered multi-tier competitive challenges spanning dynamic programming and greedy algorithms under strict timers.
* 🥇 **Runner-Up — Inter-College Coding Contest (Sept 2025)**:
  * Held at KLE Institutions, Bengaluru.
  * Demonstrated rapid real-time algorithmic problem solving and debugging.
* 📜 **Introduction to Graph Algorithms (NPTEL Certified, April 2025)**:
  * In-depth certification covering Dijkstra, Bellman-Ford, Prim's, Kruskal's, topological sort, and complexity analysis.
* ⚔️ **Active LeetCode Solver**:
  * Regularly practicing algorithms across Trees, Graphs, DP, and System Design.
  * Profile: [leetcode.com/u/SwamyBS18](https://leetcode.com/u/SwamyBS18)`;
  }

  // 9. Contact / Hiring / Availability
  if (
    query.includes('contact') || 
    query.includes('hire') || 
    query.includes('email') || 
    query.includes('phone') || 
    query.includes('linkedin') || 
    query.includes('github') ||
    query.includes('available') ||
    query.includes('job') ||
    query.includes('internship')
  ) {
    return `### **Contact & Hiring Information**

Swamy is currently open to **Software Engineering (SDE) Internships & Full-Time Backend / Cloud Engineering roles**:

* **Email**: [swamybs272@gmail.com](mailto:swamybs272@gmail.com)
* **Phone**: [+91 74114 76941](tel:+917411476941)
* **Location**: Bengaluru, Karnataka, India
* **GitHub**: [github.com/SwamyBS-codes](https://github.com/SwamyBS-codes)
* **LinkedIn**: [linkedin.com/in/swamy-b-s-86613628b](https://linkedin.com/in/swamy-b-s-86613628b)
* **LeetCode**: [leetcode.com/u/SwamyBS18](https://leetcode.com/u/SwamyBS18)

You can also download his official resume anytime:
👉 [Download Swamy's Resume PDF](/resume.pdf)`;
  }

  // 10. Resume Download Inquiry
  if (
    query.includes('resume') || 
    query.includes('cv') || 
    query.includes('pdf') || 
    query.includes('download')
  ) {
    return `### **Official Resume**

Swamy's verified 1-page software engineering resume is available for preview and download directly:

* **Format**: PDF Document (110 KB, Updated November 2026)
* **Direct Download**: [Download Swamy_BS_Resume.pdf](/resume.pdf)
* **Highlights Summary**:
  * RV College of Engineering (B.E. ISE, CGPA: 8.48/10)
  * Flagship Projects: CloudOps (AWS CI/CD), PeerShare (WebRTC P2P), Shortify
  * 2x Coding Competition Runner-Up & NPTEL Certified`;
  }

  // 11. General Bio / Introduction / "Who are you?" / "Tell me about Swamy"
  if (
    query.includes('who is swamy') || 
    query.includes('tell me about') || 
    query.includes('about you') || 
    query.includes('bio') || 
    query.includes('intro') ||
    query.includes('background') ||
    query.includes('summary') ||
    query === 'swamy'
  ) {
    return `### **About Swamy B S**

**Swamy B S** is a Systems & Software Engineer and an Information Science undergraduate at **RV College of Engineering (RVCE)**, Bengaluru (graduating in **June 2027**) with an **8.48 / 10.0 CGPA**.

* **Core Focus**: Distributed backend systems, automated cloud orchestration (AWS EC2/ECR/Docker), and real-time low-latency protocols (WebRTC P2P, WebSockets).
* **Notable Work**:
  * Engineered **CloudOps**, an automated AWS CI/CD pipeline cutting deployment times to under 60 seconds.
  * Built **PeerShare**, a decentralized browser-to-browser P2P file sharing network using WebRTC and Web Workers.
  * Built **Shortify**, a high-throughput URL platform optimized for sub-millisecond lookups.
* **Competitive Problem Solver**: 2x Inter-College contest runner-up (Coding Chef & KLE) and active on LeetCode ([SwamyBS18](https://leetcode.com/u/SwamyBS18)).

*What would you like to explore first? His projects, skills, or contact info?*`;
  }

  // 12. Greetings / Salutations
  if (
    query.startsWith('hi') || 
    query.startsWith('hello') || 
    query.startsWith('hey') || 
    query.includes('good morning') || 
    query.includes('good evening')
  ) {
    return `Hello! 👋 I'm **Swamy B S's AI Portfolio Assistant**.

I have complete knowledge of Swamy's:
* **Background & Academics** (RV College of Engineering, 8.48 CGPA)
* **Flagship Projects** (CloudOps, PeerShare WebRTC, Shortify)
* **Technical Skills** (C++, Node.js, Docker, AWS, WebRTC, PostgreSQL, Redis)
* **Achievements** (Coding Chef Runner-Up, KLE Runner-Up, LeetCode)

Feel free to ask me anything or click one of the quick suggestions below!`;
  }

  // 13. Default Fallback with helpful guidance
  return `I'm Swamy's Portfolio AI! I can answer any questions about his engineering projects, technical stack, problem-solving, or career.

Here are some examples you can ask:
* **"Explain the CloudOps project architecture"**
* **"How does PeerShare handle WebRTC ICE negotiation and chunking?"**
* **"What are his database optimization strategies in Shortify?"**
* **"Compare his WebRTC approach vs WebSockets"**
* **"Write a sample code for PeerShare file transfer"**
* **"Tell me about his college, CGPA, and competitive coding"**

*Enter your Gemini or OpenAI API key in ⚙️ Settings at the top to ask any open-ended questions!*`;
}
