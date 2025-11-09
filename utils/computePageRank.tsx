import { PageRankResult } from '@/types';
import { buildGraph } from './buildGraph';
import { nodes } from '../constants';

export const computePageRank = (damping = 0.85, threshold = 0.0001): PageRankResult => {
  const { graph } = buildGraph();
  const n = nodes.length;
  let pr: Record<string, number> = {};
  let newPr: Record<string, number> = {};
  const convergence: Array<{ iteration: number; error: number }> = [];
  
  nodes.forEach(node => pr[node] = 1.0 / n);
  
  let iter = 0;
  let diff = Infinity;
  
  while (diff > threshold && iter < 100) {
    nodes.forEach(node => newPr[node] = (1 - damping) / n);
    
    nodes.forEach(node => {
      const outDegree = graph[node].length;
      if (outDegree > 0) {
        const contribution = pr[node] / outDegree;
        graph[node].forEach(target => {
          newPr[target] += damping * contribution;
        });
      }
    });
    
    diff = 0;
    nodes.forEach(node => {
      diff += Math.abs(newPr[node] - pr[node]);
    });
    
    convergence.push({ iteration: iter + 1, error: diff });
    pr = { ...newPr };
    iter++;
  }
  
  return { scores: pr, iterations: iter, convergence };
};