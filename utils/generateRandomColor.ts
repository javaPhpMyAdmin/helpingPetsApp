const colors = [
  '#f68e8e',
  '#f67171',
  '#f72f2f',
  '#9b5d5d',
  '#d2f9c7',
  '#8dfa6f',
  '#608d8f',
  '#64aef3',
  '#7c64f3',
  '#eb8afa',
  '#f1b4d8',
  '#5a61f1',
];
export function generateColor() {
  const numero: number = Number((Math.random() * colors.length).toFixed(0));
  return colors[numero];
}
