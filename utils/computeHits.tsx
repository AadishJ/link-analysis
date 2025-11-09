import { HITSResult } from '@/types';
import { buildGraph } from './buildGraph';
import { nodes } from '../constants';

export const computeHITS = (threshold = 0.0001): HITSResult => {
  const { inLinks, outLinks } = buildGraph();
  let auth: Record<string, number> = {};
  let hub: Record<string, number> = {};
  const convergence: Array<{ iteration: number; error: number }> = [];
  
  nodes.forEach(node => {
    auth[node] = 1.0;
    hub[node] = 1.0;
  });
  
  let iter = 0;
  let diff = Infinity;
  
  while (diff > threshold && iter < 100) {
    const newAuth: Record<string, number> = {};
    const newHub: Record<string, number> = {};
    
    nodes.forEach(node => {
      newAuth[node] = inLinks[node].reduce((sum, src) => sum + hub[src], 0);
    });
    
    nodes.forEach(node => {
      newHub[node] = outLinks[node].reduce((sum, tgt) => sum + auth[tgt], 0);
    });
    
    const authNorm = Math.sqrt(Object.values(newAuth).reduce((s, v) => s + v * v, 0));
    const hubNorm = Math.sqrt(Object.values(newHub).reduce((s, v) => s + v * v, 0));
    
    nodes.forEach(node => {
      newAuth[node] /= authNorm || 1;
      newHub[node] /= hubNorm || 1;
    });
    
    diff = 0;
    nodes.forEach(node => {
      diff += Math.abs(newAuth[node] - auth[node]) + Math.abs(newHub[node] - hub[node]);
    });
    
    convergence.push({ iteration: iter + 1, error: diff });
    auth = newAuth;
    hub = newHub;
    iter++;
  }
  
  return { authority: auth, hub: hub, iterations: iter, convergence };
};