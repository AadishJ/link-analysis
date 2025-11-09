import { GraphData } from '@/types';

export const buildGraph = (
  edges: [string, string][],
  nodes: string[]
): GraphData => {
  const graph: Record<string, string[]> = {};
  const inLinks: Record<string, string[]> = {};
  const outLinks: Record<string, string[]> = {};
  
  nodes.forEach(node => {
    graph[node] = [];
    inLinks[node] = [];
    outLinks[node] = [];
  });
  
  edges.forEach(([src, tgt]) => {
    if (graph[src] && graph[tgt]) {
      graph[src].push(tgt);
      outLinks[src].push(tgt);
      inLinks[tgt].push(src);
    }
  });
  
  return { graph, inLinks, outLinks };
};