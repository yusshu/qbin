import config from '../config';

/**
 * Generates a paste id using the characters
 * and length specified in configuration.
 */
export function generatePasteId(): string {
  let chars: string = config.id.characters;
  let length: number = config.id.length;
  let value: string[] = [];
  while (length > 0) {
    let index = Math.floor(Math.random() * chars.length);
    let char = chars.charAt(index);
    value.push(char);
    length--;
  }
  return value.join('');
}
