import { GraphData } from '@/types';
import { edges, nodes } from '../constants';

export const buildGraph = (): GraphData => {
  const graph: Record<string, string[]> = {};
  const inLinks: Record<string, string[]> = {};
  const outLinks: Record<string, string[]> = {};
  
  nodes.forEach(node => {
    graph[node] = [];
    inLinks[node] = [];
    outLinks[node] = [];
  });
  
  edges.forEach(([src, tgt]) => {
    graph[src].push(tgt);
    outLinks[src].push(tgt);
    inLinks[tgt].push(src);
  });
  
  return { graph, inLinks, outLinks };
};