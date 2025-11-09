import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageRankResult, HITSResult } from '@/types';

interface ComparisonChartProps {
  pageRankResults: PageRankResult | null;
  hitsResults: HITSResult | null;
  nodes: string[];
}

export const ComparisonChart = ({ pageRankResults, hitsResults, nodes }: ComparisonChartProps) => {
  if (!pageRankResults || !hitsResults) return null;

  const chartData = nodes.map(node => ({
    name: node,
    PageRank: pageRankResults.scores[node] * 100,
    Authority: hitsResults.authority[node] * 10,
    Hub: hitsResults.hub[node] * 10
  })).sort((a, b) => b.PageRank - a.PageRank).slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Algorithm Comparison: Top 10 Nodes</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            tick={{ fill: '#374151', fontWeight: 500 }}
          />
          <YAxis 
            label={{ value: 'Score (scaled)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontWeight: 600 } }}
            tick={{ fill: '#374151' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="PageRank" fill="#3b82f6" name="PageRank (×100)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Authority" fill="#ef4444" name="Authority (×10)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Hub" fill="#10b981" name="Hub (×10)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};