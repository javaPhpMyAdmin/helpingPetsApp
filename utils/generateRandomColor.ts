function generarLetra() {
  const letras = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  const numero: number = Number((Math.random() * 15).toFixed(0));
  return letras[numero];
}
export function colorHEX() {
  let color = '';
  for (let i = 0; i < 6; i++) {
    color = color + generarLetra();
  }
  return '#' + color;
}
