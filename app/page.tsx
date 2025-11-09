'use client';

import { useState, useEffect } from 'react';
import { computePageRank } from '@/utils/computePageRank';
import { computeHITS } from '@/utils/computeHits';
import { PageRankResult, HITSResult, ViewType } from '@/types';
import { DEFAULT_EDGES, DEFAULT_NODES } from '@/constants';
import { GraphVisualization } from '@/components/GraphVisualization';
import { ResultsTable } from '@/components/ResultsTable';
import { ComparisonChart } from '@/components/ComparisionChart';
import { ConvergenceChart } from '@/components/ConvergenceChart';
import { Analysis } from '@/components/Analysis';
import { ParameterControls } from '@/components/ParameterControls';
import { ViewSelector } from '@/components/ViewSelector';
import { FileUpload } from '@/components/FileUpload';

const Page = () => {
  const [pageRankResults, setPageRankResults] = useState<PageRankResult | null>(null);
  const [hitsResults, setHitsResults] = useState<HITSResult | null>(null);
  const [convergenceData, setConvergenceData] = useState<{ 
    pr: Array<{ iteration: number; error: number }>; 
    hits: Array<{ iteration: number; error: number }> 
  }>({ pr: [], hits: [] });
  const [iterations, setIterations] = useState({ pr: 0, hits: 0 });
  const [activeView, setActiveView] = useState<ViewType>('graph');
  const [dampingFactor, setDampingFactor] = useState(0.85);
  const [threshold, setThreshold] = useState(0.0001);
  const [edges, setEdges] = useState<[string, string][]>(DEFAULT_EDGES);
  const [nodes, setNodes] = useState<string[]>(DEFAULT_NODES);
  const [hasCustomData, setHasCustomData] = useState(false);

  const getTop5 = (scores: Record<string, number>): [string, number][] => {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const handleFileLoad = (newEdges: [string, string][]) => {
    setEdges(newEdges);
    setNodes([...new Set(newEdges.flat())]);
    setHasCustomData(true);
  };

  const handleReset = () => {
    setEdges(DEFAULT_EDGES);
    setNodes(DEFAULT_NODES);
    setHasCustomData(false);
  };

  // Compute rankings when data or parameters change
  useEffect(() => {
    const prResult = computePageRank(edges, nodes, dampingFactor, threshold);
    const hitsResult = computeHITS(edges, nodes, threshold);
    
    setPageRankResults(prResult);
    setHitsResults(hitsResult);
    setConvergenceData({ pr: prResult.convergence, hits: hitsResult.convergence });
    setIterations({ pr: prResult.iterations, hits: hitsResult.iterations });
  }, [dampingFactor, threshold, edges, nodes]);

  if (!pageRankResults || !hitsResults) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Computing rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white">
          <h1 className="text-4xl font-bold mb-3">
            PageRank & HITS Algorithm Analysis
          </h1>
          <p className="text-indigo-100 text-lg">
            Analyzing {nodes.length} nodes with {edges.length} directed edges • Damping Factor d = {dampingFactor} • Threshold &lt; {threshold}
          </p>
        </div>

        <FileUpload 
          onFileLoad={handleFileLoad}
          onReset={handleReset}
          hasCustomData={hasCustomData}
        />

        <ParameterControls 
          dampingFactor={dampingFactor}
          threshold={threshold}
          onDampingFactorChange={setDampingFactor}
          onThresholdChange={setThreshold}
        />

        <ViewSelector 
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {activeView === 'graph' && (
          <GraphVisualization 
            pageRankResults={pageRankResults}
            hitsResults={hitsResults}
            edges={edges}
            nodes={nodes}
          />
        )}

        {activeView === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ResultsTable 
              title="🏆 Top 5: PageRank" 
              data={getTop5(pageRankResults.scores)} 
            />
            <ResultsTable 
              title="📚 Top 5: Authority Scores" 
              data={getTop5(hitsResults.authority)} 
              isHITS={true}
              scoreType="Authority"
            />
            <ResultsTable 
              title="🔗 Top 5: Hub Scores" 
              data={getTop5(hitsResults.hub)} 
              isHITS={true}
              scoreType="Hub"
            />
          </div>
        )}

        {activeView === 'comparison' && (
          <ComparisonChart 
            pageRankResults={pageRankResults}
            hitsResults={hitsResults}
            nodes={nodes}
          />
        )}
        
        {activeView === 'convergence' && (
          <ConvergenceChart convergenceData={convergenceData} />
        )}
        
        {activeView === 'analysis' && (
          <Analysis 
            pageRankResults={pageRankResults}
            hitsResults={hitsResults}
            iterations={iterations}
            dampingFactor={dampingFactor}
            threshold={threshold}
          />
        )}
      </div>
    </div>
  );
};

export default Page;