import { ChangeEvent, useRef } from 'react';

interface FileUploadProps {
  onFileLoad: (edges: [string, string][]) => void;
  onReset: () => void;
  hasCustomData: boolean;
}

export const FileUpload = ({ onFileLoad, onReset, hasCustomData }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      try {
        const lines = csvText.trim().split('\n');
        const startIndex = lines[0].toLowerCase().includes('source') || lines[0].toLowerCase().includes('from') ? 1 : 0;
        
        const edges: [string, string][] = lines.slice(startIndex).map(line => {
          const [source = '', target = ''] = line.split(',').map(s => s.trim());
          return [source, target] as [string, string];
        }).filter(([source, target]) => source && target);

        if (edges.length === 0) {
          alert('No valid edges found in CSV file');
          return;
        }

        onFileLoad(edges);
      } catch (error) {
        alert('Error parsing CSV file. Please check the format.');
        console.error('CSV parsing error:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onReset();
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Data Source</h3>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <label 
            htmlFor="csv-upload" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload CSV
          </label>
          <input
            id="csv-upload"
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {hasCustomData && (
          <button
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset to Default
          </button>
        )}

        <div className="text-sm text-gray-600">
          {hasCustomData ? (
            <span className="flex items-center text-green-600 font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Custom data loaded
            </span>
          ) : (
            <span className="text-gray-500">Using default data</span>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-1">CSV Format:</p>
        <code className="block bg-white p-2 rounded mt-1 text-xs">
          source,target<br/>
          Node1,Node2<br/>
          Node2,Node3
        </code>
      </div>
    </div>
  );
};