export interface PageRankResult {
  scores: Record<string, number>;
  iterations: number;
  convergence: Array<{ iteration: number; error: number }>;
}

export interface HITSResult {
  authority: Record<string, number>;
  hub: Record<string, number>;
  iterations: number;
  convergence: Array<{ iteration: number; error: number }>;
}

export interface GraphData {
  graph: Record<string, string[]>;
  inLinks: Record<string, string[]>;
  outLinks: Record<string, string[]>;
}

export type ViewType = 'graph' | 'results' | 'comparison' | 'convergence' | 'analysis';