interface ResultsTableProps {
  title: string;
  data: [string, number][];
  isHITS?: boolean;
  scoreType?: string;
}

export const ResultsTable = ({ title, data, isHITS = false, scoreType = '' }: ResultsTableProps) => (
  <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
    <h3 className="font-bold text-lg mb-4 text-gray-800">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-2 font-semibold">Rank</th>
            <th className="text-left py-3 px-2 font-semibold">Node</th>
            <th className="text-right py-3 px-2 font-semibold">{scoreType || (isHITS ? 'Score' : 'PageRank')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([node, score], i) => (
            <tr key={node} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-2">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  i === 0 ? 'bg-yellow-400 text-yellow-900' : 
                  i === 1 ? 'bg-gray-300 text-gray-800' : 
                  i === 2 ? 'bg-orange-300 text-orange-900' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {i + 1}
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-gray-700">{node}</td>
              <td className="py-3 px-2 text-right font-mono text-gray-600">{score.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);