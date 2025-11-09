import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ConvergenceChartProps {
  convergenceData: {
    pr: Array<{ iteration: number; error: number }>;
    hits: Array<{ iteration: number; error: number }>;
  };
}

export const ConvergenceChart = ({ convergenceData }: ConvergenceChartProps) => {
  if (!convergenceData.pr.length || !convergenceData.hits.length) return null;

  const maxLen = Math.max(convergenceData.pr.length, convergenceData.hits.length);
  const chartData = Array.from({ length: maxLen }, (_, i) => ({
    iteration: i + 1,
    PageRank: convergenceData.pr[i]?.error || null,
    HITS: convergenceData.hits[i]?.error || null
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Convergence Analysis</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="iteration" 
            label={{ value: 'Iterations', position: 'insideBottom', offset: -15, style: { fill: '#374151', fontWeight: 600 } }}
            tick={{ fill: '#374151' }}
          />
          <YAxis 
            scale="log"
            domain={['auto', 'auto']}
            label={{ value: 'Error (log scale)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontWeight: 600 } }}
            tick={{ fill: '#374151' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: any) => value?.toExponential(3)}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Line type="monotone" dataKey="PageRank" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="HITS" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};