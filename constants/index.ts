export const edges: [string, string][] = [
  ['Alice', 'Bob'], ['Alice', 'Charlie'], ['Alice', 'David'], ['Alice', 'Eve'],
  ['Bob', 'Alice'], ['Bob', 'Eve'], ['Bob', 'Frank'], ['Bob', 'Grace'],
  ['Charlie', 'Alice'], ['Charlie', 'Bob'], ['Charlie', 'Grace'], ['Charlie', 'Henry'],
  ['David', 'Alice'], ['David', 'Henry'], ['David', 'Ian'],
  ['Eve', 'Bob'], ['Eve', 'Ian'], ['Eve', 'Jack'], ['Eve', 'Kelly'],
  ['Frank', 'Bob'], ['Frank', 'Eve'], ['Frank', 'Kelly'], ['Frank', 'Laura'],
  ['Grace', 'Charlie'], ['Grace', 'Laura'], ['Grace', 'Mike'],
  ['Henry', 'David'], ['Henry', 'Mike'], ['Henry', 'Nathan'],
  ['Ian', 'Eve'], ['Ian', 'Jack'], ['Ian', 'Nathan'],
  ['Jack', 'Eve'], ['Jack', 'Ian'], ['Jack', 'Nathan'], ['Jack', 'Oliver'],
  ['Kelly', 'Frank'], ['Kelly', 'Oliver'],
  ['Laura', 'Grace'], ['Laura', 'Mike'],
  ['Mike', 'Henry'], ['Mike', 'Laura'],
  ['Nathan', 'Jack'], ['Nathan', 'Henry'],
  ['Oliver', 'Kelly'], ['Oliver', 'Jack']
];

export const nodes = [...new Set(edges.flat())];