interface ParameterControlsProps {
  dampingFactor: number;
  threshold: number;
  onDampingFactorChange: (value: number) => void;
  onThresholdChange: (value: number) => void;
}

export const ParameterControls = ({
  dampingFactor,
  threshold,
  onDampingFactorChange,
  onThresholdChange
}: ParameterControlsProps) => (
  <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
    <h3 className="font-bold text-lg mb-4 text-gray-800">Algorithm Parameters</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Damping Factor (d): {dampingFactor}
        </label>
        <input
          type="range"
          min="0.5"
          max="0.95"
          step="0.05"
          value={dampingFactor}
          onChange={(e) => onDampingFactorChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <p className="text-xs text-gray-500 mt-1">Controls random jump probability in PageRank</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Convergence Threshold: {threshold}
        </label>
        <select
          value={threshold}
          onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value={0.001}>0.001 (Loose)</option>
          <option value={0.0001}>0.0001 (Standard)</option>
          <option value={0.00001}>0.00001 (Tight)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Lower values increase precision but require more iterations</p>
      </div>
    </div>
  </div>
);