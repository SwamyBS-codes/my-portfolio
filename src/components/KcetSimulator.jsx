import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, School, CheckCircle2 } from 'lucide-react';

const COLLEGES_DB = [
  { name: "RV College of Engineering (RVCE)", branch: "Information Science & Eng (ISE)", cutoffGM: 850, cutoff2A: 1650, placementRate: "98%" },
  { name: "RV College of Engineering (RVCE)", branch: "Computer Science & Eng (CSE)", cutoffGM: 420, cutoff2A: 950, placementRate: "99%" },
  { name: "BMS College of Engineering (BMSCE)", branch: "Information Science & Eng (ISE)", cutoffGM: 2800, cutoff2A: 4900, placementRate: "94%" },
  { name: "MS Ramaiah Institute of Tech (MSRIT)", branch: "Information Science & Eng (ISE)", cutoffGM: 3200, cutoff2A: 5500, placementRate: "93%" },
  { name: "PES University (RR Campus)", branch: "Computer Science & Eng (CSE)", cutoffGM: 1600, cutoff2A: 3100, placementRate: "95%" },
  { name: "Dayananda Sagar College (DSCE)", branch: "Computer Science & Eng (CSE)", cutoffGM: 6500, cutoff2A: 11200, placementRate: "89%" }
];

const KcetSimulator = () => {
  const [userRank, setUserRank] = useState(1200);
  const [category, setCategory] = useState('GM'); // 'GM' | '2A'
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  const filteredColleges = COLLEGES_DB.filter(c => {
    if (selectedBranch !== 'ALL' && !c.branch.includes(selectedBranch)) return false;
    return true;
  }).map(c => {
    const cutoff = category === 'GM' ? c.cutoffGM : c.cutoff2A;
    let match = "Safe / High Probability";
    let badgeClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (userRank > cutoff * 1.25) {
      match = "Ambitious / Reach";
      badgeClass = "text-rose-400 bg-rose-500/10 border-rose-500/30";
    } else if (userRank > cutoff * 0.9) {
      match = "Competitive / Target";
      badgeClass = "text-amber-400 bg-amber-500/10 border-amber-500/30";
    }
    return { ...c, cutoff, match, badgeClass };
  });

  return (
    <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gray-900/50 border border-amber-500/30 shadow-xl space-y-5">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-amber-400 font-medium">ALGORITHM ENGINE</span>
            <span className="text-gray-500">•</span>
            <span className="text-xs text-gray-400 font-mono">Rank & Cutoff Recommendation Predictor</span>
          </div>
          <h4 className="font-semibold text-white text-base mt-0.5">
            KCET Counselling Cutoff Predictor Simulator
          </h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold self-start sm:self-auto">
          70+ Students Guided
        </div>
      </div>

      {/* Control sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-gray-950 border border-gray-800">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5 flex justify-between">
            <span>KCET Rank Input:</span>
            <span className="text-amber-400 font-bold">#{userRank}</span>
          </label>
          <input
            type="range"
            min="100"
            max="15000"
            step="100"
            value={userRank}
            onChange={(e) => setUserRank(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5">Reservation Category:</label>
          <div className="flex gap-2">
            {['GM', '2A'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
                  category === cat
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-gray-900 border-gray-800 text-gray-400'
                }`}
              >
                {cat} Category
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5">Branch Filter:</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono text-gray-200 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Branches (CSE / ISE)</option>
            <option value="ISE">Information Science (ISE)</option>
            <option value="CSE">Computer Science (CSE)</option>
          </select>
        </div>
      </div>

      {/* College Predictions */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono text-gray-400 block mb-1">
          Predicted Admission Probabilities for Rank #{userRank} ({category}):
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredColleges.map((col, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-850 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h5 className="font-semibold text-gray-100 text-xs">{col.name}</h5>
                  <p className="font-mono text-[11px] text-amber-300">{col.branch}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border shrink-0 ${col.badgeClass}`}>
                  {col.match}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-gray-850/80">
                <span>Closing Cutoff: <strong className="text-white">#{col.cutoff}</strong></span>
                <span>Placement Record: <strong className="text-emerald-400">{col.placementRate}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KcetSimulator;
