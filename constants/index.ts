export const DEFAULT_EDGES: [string, string][] = [
  ['Aarav', 'Vivaan'], ['Aarav', 'Aditya'], ['Aarav', 'Vihaan'], ['Aarav', 'Arjun'],
  ['Vivaan', 'Aarav'], ['Vivaan', 'Arjun'], ['Vivaan', 'Sai'], ['Vivaan', 'Reyansh'],
  ['Aditya', 'Aarav'], ['Aditya', 'Vivaan'], ['Aditya', 'Reyansh'], ['Aditya', 'Ayaan'],
  ['Vihaan', 'Aarav'], ['Vihaan', 'Ayaan'], ['Vihaan', 'Krishna'],
  ['Arjun', 'Vivaan'], ['Arjun', 'Krishna'], ['Arjun', 'Ishaan'], ['Arjun', 'Shaurya'],
  ['Sai', 'Vivaan'], ['Sai', 'Arjun'], ['Sai', 'Shaurya'], ['Sai', 'Atharv'],
  ['Reyansh', 'Aditya'], ['Reyansh', 'Atharv'], ['Reyansh', 'Advik'],
  ['Ayaan', 'Vihaan'], ['Ayaan', 'Advik'], ['Ayaan', 'Pranav'],
  ['Krishna', 'Arjun'], ['Krishna', 'Ishaan'], ['Krishna', 'Pranav'],
  ['Ishaan', 'Arjun'], ['Ishaan', 'Krishna'], ['Ishaan', 'Pranav'], ['Ishaan', 'Kabir'],
  ['Shaurya', 'Sai'], ['Shaurya', 'Kabir'],
  ['Atharv', 'Reyansh'], ['Atharv', 'Advik'],
  ['Advik', 'Ayaan'], ['Advik', 'Atharv'],
  ['Pranav', 'Ishaan'], ['Pranav', 'Ayaan'],
  ['Kabir', 'Shaurya'], ['Kabir', 'Ishaan']
];

export const DEFAULT_NODES = [...new Set(DEFAULT_EDGES.flat())];

export const parseCSV = (csvText: string): [string, string][] => {
  const lines = csvText.trim().split('\n');
  
  // Skip header if exists
  const startIndex = lines[0].toLowerCase().includes('source') || lines[0].toLowerCase().includes('from') ? 1 : 0;
  
  const edges: [string, string][] = lines
    .slice(startIndex)
    .map(line => {
      const parts = line.split(',').map(s => s.trim());
      const source = parts[0] ?? '';
      const target = parts[1] ?? '';
      return [source, target] as [string, string];
    })
    .filter(([source, target]) => source !== '' && target !== '');
  
  return edges;
};