import { PageRankResult, HITSResult } from "@/types";
import { edges, nodes } from "../constants";

interface GraphVisualizationProps {
  pageRankResults: PageRankResult | null;
  hitsResults: HITSResult | null;
}

export const GraphVisualization = ({
  pageRankResults,
  hitsResults,
}: GraphVisualizationProps) => {
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 220;
  const getTop5 = (scores: Record<string, number>): [string, number][] => {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const positions: Record<string, { x: number; y: number }> = {};
  nodes.forEach((node, i) => {
    const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
    positions[node] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  const getNodeSize = (node: string): number => {
    if (!pageRankResults) return 10;
    const pr = pageRankResults.scores[node];
    return 8 + pr * 400;
  };

  const getNodeColor = (node: string): string => {
    if (!hitsResults) return "#3b82f6";

    const topAuths = getTop5(hitsResults.authority).map((x) => x[0]);
    const topHubs = getTop5(hitsResults.hub).map((x) => x[0]);

    if (topAuths.includes(node) && topHubs.includes(node)) return "#a855f7";
    if (topAuths.includes(node)) return "#ef4444";
    if (topHubs.includes(node)) return "#10b981";
    return "#3b82f6";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-bold text-xl mb-4 text-gray-800">
        Network Visualization
      </h3>
      <svg width={width} height={height} className="mx-auto">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
          </marker>
          <filter id="shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>

        {edges.map(([src, tgt], i) => {
          const x1 = positions[src].x;
          const y1 = positions[src].y;
          const x2 = positions[tgt].x;
          const y2 = positions[tgt].y;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          const offset = getNodeSize(tgt) + 3;

          const endX = x2 - (dx / len) * offset;
          const endY = y2 - (dy / len) * offset;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={endX}
              y2={endY}
              stroke="#cbd5e1"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              opacity="0.4"
            />
          );
        })}

        {nodes.map((node) => (
          <g key={node}>
            <circle
              cx={positions[node].x}
              cy={positions[node].y}
              r={getNodeSize(node)}
              fill={getNodeColor(node)}
              stroke="#fff"
              strokeWidth="3"
              filter="url(#shadow)"
              className="transition-all duration-300 hover:opacity-80"
            />
            <text
              x={positions[node].x}
              y={positions[node].y - getNodeSize(node) - 8}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#1e293b"
              className="select-none"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-6 flex flex-wrap gap-6 text-sm justify-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-red-500 shadow-sm"></div>
          <span className="font-medium">Top Authority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500 shadow-sm"></div>
          <span className="font-medium">Top Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-500 shadow-sm"></div>
          <span className="font-medium">Authority & Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm"></div>
          <span className="font-medium">Standard</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="font-semibold">Node size ∝ PageRank score</span>
        </div>
      </div>
    </div>
  );
};
