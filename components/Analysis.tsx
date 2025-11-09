import { PageRankResult, HITSResult } from '@/types';

interface AnalysisProps {
  pageRankResults: PageRankResult | null;
  hitsResults: HITSResult | null;
  iterations: { pr: number; hits: number };
  dampingFactor: number;
  threshold: number;
}

export const Analysis = ({ pageRankResults, hitsResults, iterations, dampingFactor, threshold }: AnalysisProps) => {
  if (!pageRankResults || !hitsResults) return null;
  const getTop5 = (scores: Record<string, number>): [string, number][] => {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
};

  const top5PR = getTop5(pageRankResults.scores);
  const top5Auth = getTop5(hitsResults.authority);
  const top5Hubs = getTop5(hitsResults.hub);

  const commonNodes = top5PR
    .map(([node]) => node)
    .filter(node => top5Auth.map(([n]) => n).includes(node));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-bold text-2xl mb-5 text-gray-800">Analysis & Insights</h3>
      <div className="space-y-5 text-sm leading-relaxed">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="font-semibold text-blue-900 mb-2 text-base">📊 Algorithm Convergence</p>
          <p className="text-gray-700">• PageRank converged in <span className="font-bold text-blue-700">{iterations.pr}</span> iterations</p>
          <p className="text-gray-700">• HITS converged in <span className="font-bold text-blue-700">{iterations.hits}</span> iterations</p>
          <p className="text-gray-700">• Damping factor: <span className="font-bold">{dampingFactor}</span> | Threshold: <span className="font-bold">{threshold}</span></p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="font-semibold text-purple-900 mb-2 text-base">🎯 High-Impact Nodes</p>
          <p className="text-gray-700">Nodes ranked highly in both PageRank and HITS Authority: 
            <span className="font-bold text-purple-700 ml-1">
              {commonNodes.length > 0 ? commonNodes.join(', ') : 'None in common top 5'}
            </span>
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="font-semibold text-green-900 mb-3 text-base">🔍 Key Findings</p>
          <div className="space-y-2 text-gray-700">
            <p>• <strong className="text-blue-600">PageRank Leaders</strong> ({top5PR[0][0]}, {top5PR[1][0]}): Most influential users with high incoming link quality and quantity</p>
            <p>• <strong className="text-red-600">Top Authorities</strong> ({top5Auth[0][0]}, {top5Auth[1][0]}): Content creators trusted and promoted by active network hubs</p>
            <p>• <strong className="text-green-600">Top Hubs</strong> ({top5Hubs[0][0]}, {top5Hubs[1][0]}): Active curators who amplify quality content across the network</p>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="font-semibold text-amber-900 mb-3 text-base">💡 Social Network Interpretation</p>
          <div className="space-y-2 text-gray-700">
            <p>• <strong>High PageRank:</strong> Influential thought leaders whose content spreads widely</p>
            <p>• <strong>High Authority:</strong> Trusted content creators endorsed by network connectors</p>
            <p>• <strong>High Hub:</strong> Active promoters who discover and share valuable content</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <p className="font-semibold text-indigo-900 mb-3 text-base">⚖️ Algorithmic Differences</p>
          <div className="space-y-2 text-gray-700">
            <p>• <strong>PageRank:</strong> Democratic approach considering global link structure and propagation</p>
            <p>• <strong>HITS:</strong> Role-based approach distinguishing content creators from content promoters</p>
            <p>• <strong>Use Case:</strong> PageRank for overall influence ranking; HITS for identifying distinct roles in networks</p>
          </div>
        </div>
      </div>
    </div>
  );
};