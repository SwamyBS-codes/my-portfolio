import React, { useState } from 'react';
import { Database, Key, ShieldCheck, Tag, Zap } from 'lucide-react';

const TABLES = {
  users: {
    name: "users",
    role: "User Accounts & Authentication",
    columns: [
      { name: "id", type: "UUID", desc: "Primary Key. Unique identifier generated automatically." },
      { name: "email", type: "VARCHAR(255)", desc: "Unique user email. Checked during registration & login." },
      { name: "password_hash", type: "VARCHAR(255)", desc: "Bcrypt hash. Never stored in plain text." },
      { name: "created_at", type: "TIMESTAMP", desc: "Default now(). Audit tracking of sign-ups." }
    ],
    indexes: [
      { name: "users_pkey", type: "PRIMARY KEY (B-Tree)", targets: ["id"] },
      { name: "idx_users_email", type: "UNIQUE INDEX (B-Tree)", targets: ["email"], performance: "Accelerates auth queries to O(log N) lookup latency." }
    ]
  },
  short_links: {
    name: "short_links",
    role: "Core Redirection Schemas",
    columns: [
      { name: "id", type: "INT", desc: "Primary Key. Auto-incremented sequence integer." },
      { name: "short_code", type: "VARCHAR(12)", desc: "Unique hashed slug (e.g. 'cloudops-repo') for redirects." },
      { name: "original_url", type: "TEXT", desc: "Destination URL (e.g. https://github.com/...)." },
      { name: "user_id", type: "UUID", desc: "Foreign Key. Link owner mapping back to users.id." },
      { name: "created_at", type: "TIMESTAMP", desc: "Timestamp when code was generated." },
      { name: "expire_at", type: "TIMESTAMP", desc: "Nullable. Enables automated link expiry sweeps." }
    ],
    indexes: [
      { name: "short_links_pkey", type: "PRIMARY KEY (B-Tree)", targets: ["id"] },
      { name: "idx_links_short_code", type: "UNIQUE INDEX (B-Tree)", targets: ["short_code"], performance: "Guarantees low-latency redirects (1-5ms database lookup resolution)." },
      { name: "fk_links_user", type: "FOREIGN KEY (CASCADE)", targets: ["user_id"], performance: "Deletes all links when parent user is removed." }
    ]
  },
  click_analytics: {
    name: "click_analytics",
    role: "Metrics & Geo-tracking logs",
    columns: [
      { name: "id", type: "BIGINT", desc: "Primary Key. 64-bit auto-incrementing id for high log volumes." },
      { name: "link_id", type: "INT", desc: "Foreign Key. Reference mapping click event to short_links.id." },
      { name: "country", type: "VARCHAR(3)", desc: "ISO 3166-1 alpha-3 code parsed from visitor IP." },
      { name: "referrer", type: "VARCHAR(255)", desc: "Originating page referrer (e.g. 'LinkedIn')." },
      { name: "device", type: "VARCHAR(50)", desc: "Parsed user agent category (Mobile, Desktop, Tablet)." },
      { name: "clicked_at", type: "TIMESTAMP", desc: "Exact click timestamp for chronological analytics plotting." }
    ],
    indexes: [
      { name: "click_analytics_pkey", type: "PRIMARY KEY (B-Tree)", targets: ["id"] },
      { name: "idx_clicks_link_id", type: "INDEX (B-Tree)", targets: ["link_id"], performance: "Speeds up dashboard analytics aggregate queries (GROUP BY link_id)." },
      { name: "fk_clicks_link", type: "FOREIGN KEY (CASCADE)", targets: ["link_id"], performance: "Wipes clicks logs if parent short_link is deleted." }
    ]
  }
};

const DatabaseSchema = () => {
  const [activeTable, setActiveTable] = useState('short_links');
  const [hoveredCol, setHoveredCol] = useState(null);

  const tbl = TABLES[activeTable];

  return (
    <div className="mt-6 border border-gray-800 rounded-xl overflow-hidden bg-gray-950 p-6 shadow-2xl">
      {/* Title */}
      <div className="mb-6">
        <h4 className="text-sm font-mono font-bold text-gray-200 flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Interactive Relational Database Schema (PostgreSQL)</span>
        </h4>
        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
          Hover over columns to inspect types/constraints. Click tables to inspect indexing optimizations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: ERD Schema layout */}
        <div className="lg:col-span-6 space-y-4">
          {Object.keys(TABLES).map((key) => {
            const table = TABLES[key];
            const isSelected = activeTable === key;
            return (
              <div
                key={key}
                onClick={() => setActiveTable(key)}
                className={`border rounded-xl p-4 transition-all duration-300 backdrop-blur-sm cursor-pointer select-none relative ${
                  isSelected
                    ? 'bg-gray-900 border-cyan-500/80 shadow-md shadow-cyan-500/5'
                    : 'bg-gray-900/30 border-gray-850 hover:border-gray-700'
                }`}
              >
                {/* Connector indication line (mocked visually) */}
                {key === 'users' && (
                  <div className="absolute -bottom-4 left-8 w-[2px] h-4 bg-indigo-500/30 hidden lg:block"></div>
                )}
                {key === 'short_links' && (
                  <div className="absolute -bottom-4 left-16 w-[2px] h-4 bg-purple-500/30 hidden lg:block"></div>
                )}

                {/* Table Header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Database className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`} />
                    <span className="text-xs font-mono font-bold text-white">{table.name}</span>
                  </div>
                  <span className="text-[9px] text-gray-500 italic">{table.role}</span>
                </div>

                {/* Table Columns List */}
                <div className="space-y-1">
                  {table.columns.map((col) => {
                    const isPK = col.name === 'id';
                    const isFK = col.name.endsWith('_id');
                    return (
                      <div
                        key={col.name}
                        onMouseEnter={() => setHoveredCol({ table: key, name: col.name, type: col.type, desc: col.desc })}
                        onMouseLeave={() => setHoveredCol(null)}
                        className="flex items-center justify-between px-2 py-1 hover:bg-gray-800/50 rounded font-mono text-[11px] text-gray-400 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          {isPK && <Key className="w-3 h-3 text-yellow-500 shrink-0" title="Primary Key" />}
                          {isFK && <Tag className="w-3 h-3 text-purple-400 shrink-0" title="Foreign Key" />}
                          {!isPK && !isFK && <span className="w-3 h-3 block"></span>}
                          <span className={isPK || isFK ? "text-gray-200 font-semibold" : ""}>{col.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-600 font-medium">{col.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Selected Table Indexing / Performance Details */}
        <div className="lg:col-span-6 space-y-4">
          {/* Hover Info Tooltip replacement */}
          <div className="bg-gray-900/60 border border-gray-850 rounded-xl p-4 min-h-[110px] backdrop-blur-sm">
            <h5 className="text-[10px] font-mono text-cyan-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Column Inspector</span>
            </h5>
            {hoveredCol ? (
              <div>
                <p className="text-xs font-mono text-white font-bold">
                  {hoveredCol.table}.{hoveredCol.name} <span className="text-[10px] text-gray-500">({hoveredCol.type})</span>
                </p>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{hoveredCol.desc}</p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic py-3">
                Hover over table columns on the left to inspect properties, constraints, and roles.
              </p>
            )}
          </div>

          {/* Table Optimization Details */}
          <div className="bg-gray-900/30 border border-gray-850 rounded-xl p-5">
            <div className="flex items-center gap-2 border-b border-gray-900 pb-3 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h5 className="text-xs font-bold text-white font-mono">
                Indices & Constraints: <span className="text-cyan-400">{tbl.name}</span>
              </h5>
            </div>

            <div className="space-y-4">
              {tbl.indexes.map((idx, iIdx) => (
                <div key={iIdx} className="bg-gray-950 p-3 rounded-lg border border-gray-900 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-900 pb-1.5 mb-1.5">
                    <span className="text-gray-200 font-bold text-[11px]">{idx.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-900 border border-gray-850 text-gray-500 font-semibold">{idx.type}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    <span className="text-cyan-400">Target columns:</span> {idx.targets.join(', ')}
                  </p>
                  {idx.performance && (
                    <p className="text-[10px] text-emerald-400/90 mt-1 leading-normal">
                      ⚡ {idx.performance}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchema;
