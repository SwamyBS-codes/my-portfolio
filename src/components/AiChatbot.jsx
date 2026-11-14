import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, X, Send, Trash2, ArrowUpRight, 
  Check, Copy, User, ShieldCheck
} from 'lucide-react';
import { sendChatMessageToAi } from '../utils/aiResumeEngine';

// Code Block Component with Copy-to-Clipboard
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl overflow-hidden border border-gray-800 bg-gray-950 text-xs font-mono">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-800 text-[11px] text-gray-400">
        <span className="uppercase font-semibold tracking-wider text-cyan-400">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-gray-200 leading-relaxed font-mono text-[11px]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const AiChatbot = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hi! I'm **Swamy's Portfolio AI**.\n\nI have complete knowledge of Swamy's verified resume, academics at **RV College of Engineering**, and all flagship projects (**CloudOps**, **PeerShare WebRTC**, **Shortify**).\n\nYou can ask me **ANY question** — from deep technical architecture and code logic to career opportunities and interview questions!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickPrompts = [
    "Tell me about Swamy",
    "Explain CloudOps architecture",
    "How does PeerShare handle WebRTC?",
    "What are his technical skills?",
    "Education & CGPA",
    "How can I contact or hire him?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessageId = Date.now().toString();
    const newUserMessage = {
      id: userMessageId,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendChatMessageToAi(updatedMessages);
      const newAiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        source: response.source,
        model: response.model,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `⚠️ **Response Notice**: ${err.message || 'Unable to generate response'}. Please try asking again.`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'ai',
        text: "Conversation cleared. What would you like to explore next about Swamy or his engineering projects?",
        timestamp: new Date()
      }
    ]);
  };

  // Markdown Parser supporting Code Blocks, Headers, Lists, Bold, and Links
  const renderFormattedText = (raw) => {
    if (!raw) return null;

    if (raw.includes('```')) {
      const segments = raw.split(/(```[\s\S]*?```)/g);
      return segments.map((seg, sIdx) => {
        if (seg.startsWith('```') && seg.endsWith('```')) {
          const firstLineEnd = seg.indexOf('\n');
          let language = '';
          let codeContent = '';
          if (firstLineEnd !== -1) {
            language = seg.slice(3, firstLineEnd).trim();
            codeContent = seg.slice(firstLineEnd + 1, -3);
          } else {
            codeContent = seg.slice(3, -3);
          }
          return <CodeBlock key={sIdx} language={language} code={codeContent} />;
        }
        return <div key={sIdx}>{renderMarkdownParagraphs(seg)}</div>;
      });
    }

    return renderMarkdownParagraphs(raw);
  };

  const renderMarkdownParagraphs = (text) => {
    return text.split('\n').map((line, lIdx) => {
      // Header ###
      if (line.startsWith('### ')) {
        return (
          <h4 key={lIdx} className="font-semibold text-sm mt-3 mb-1 text-cyan-300">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Header ##
      if (line.startsWith('## ')) {
        return (
          <h3 key={lIdx} className="font-bold text-base mt-3 mb-1.5 text-white">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Blockquote >
      if (line.startsWith('> ')) {
        return (
          <div key={lIdx} className="border-l-2 border-cyan-500/50 pl-3 py-1 my-1.5 text-xs text-gray-300 bg-gray-900/40 rounded-r-lg">
            {formatInline(line.replace('> ', ''))}
          </div>
        );
      }
      // Bullet points * or -
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <div key={lIdx} className="flex items-start gap-2 my-1 text-xs text-gray-300 pl-1 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
            <div className="flex-1">{formatInline(content)}</div>
          </div>
        );
      }
      // Numbered lists 1. 2.
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={lIdx} className="flex items-start gap-2 my-1 text-xs text-gray-300 pl-1 leading-relaxed">
            <span className="font-mono text-cyan-400 shrink-0 text-[11px] font-semibold">{line.match(/^\d+\./)[0]}</span>
            <div className="flex-1">{formatInline(line.replace(/^\d+\.\s/, ''))}</div>
          </div>
        );
      }
      // Empty line spacer
      if (!line.trim()) {
        return <div key={lIdx} className="h-2" />;
      }
      // Normal paragraph
      return (
        <p key={lIdx} className="text-xs text-gray-300 leading-relaxed my-1">
          {formatInline(line)}
        </p>
      );
    });
  };

  // Helper for inline markdown: bold, code, links
  const formatInline = (str) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const codeRegex = /`(.*?)`/g;

    str = str.replace(linkRegex, (match, text, url) => `__LINK__${text}__URL__${url}__ENDLINK__`);
    str = str.replace(boldRegex, (match, content) => `__BOLD__${content}__ENDBOLD__`);
    str = str.replace(codeRegex, (match, content) => `__CODE__${content}__ENDCODE__`);

    const tokens = str.split(/(__LINK__.*?__ENDLINK__|__BOLD__.*?__ENDBOLD__|__CODE__.*?__ENDCODE__)/);

    return tokens.map((token, idx) => {
      if (token.startsWith('__LINK__')) {
        const parts = token.replace('__LINK__', '').replace('__ENDLINK__', '').split('__URL__');
        const linkText = parts[0];
        const linkUrl = parts[1];
        return (
          <a
            key={idx}
            href={linkUrl}
            target={linkUrl.startsWith('http') || linkUrl.endsWith('.pdf') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            <span>{linkText}</span>
            {linkUrl.startsWith('http') && <ArrowUpRight className="w-3 h-3 inline" />}
          </a>
        );
      }
      if (token.startsWith('__BOLD__')) {
        return (
          <strong key={idx} className="font-semibold text-white">
            {token.replace('__BOLD__', '').replace('__ENDBOLD__', '')}
          </strong>
        );
      }
      if (token.startsWith('__CODE__')) {
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded bg-gray-950 border border-gray-800 text-cyan-300 font-mono text-[11px]">
            {token.replace('__CODE__', '').replace('__ENDCODE__', '')}
          </code>
        );
      }
      return token;
    });
  };

  return (
    <>
      {/* Floating Widget Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="chat-launcher relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-medium text-xs sm:text-sm shadow-xl shadow-cyan-500/25 border border-white/20 cursor-pointer group backdrop-blur-md"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-gray-950 animate-pulse" />
          </div>
          <span className="font-medium tracking-tight">Ask Swamy's AI</span>
          <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
        </motion.button>
      </div>

      {/* Expandable Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="chat-panel fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[480px] h-[640px] max-h-[85vh] flex flex-col bg-gray-950/95 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white leading-tight">Swamy's Portfolio AI</h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono">
                    AI Systems & Engineering Assistant
                  </p>
                </div>
              </div>

              {/* Actions: Clear & Close */}
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  title="Close AI Assistant"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-950/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none'
                        : 'bg-gray-900/90 border border-gray-800/90 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div>
                        {renderFormattedText(msg.text)}
                        {msg.model && (
                          <div className="mt-2 pt-1 border-t border-gray-800/60 text-[9px] font-mono text-gray-500 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                            <span>Powered by {msg.model}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-400 pl-9">
                  <div className="flex items-center gap-1 p-2 rounded-xl bg-gray-900 border border-gray-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    Formulating response...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-3 py-2 bg-gray-900/40 border-t border-gray-850 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {quickPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full bg-gray-900 border border-gray-800 hover:border-cyan-500/40 text-[11px] font-mono text-gray-300 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-gray-900/90 border-t border-gray-800 shrink-0">
              <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 focus-within:border-cyan-500/50 rounded-xl px-3 py-2 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Swamy or his engineering projects..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 focus:ring-0"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-gray-950 transition-colors cursor-pointer shrink-0"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-1.5 px-1">
                <span>Press Enter to send</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Knowledge Engine</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbot;
