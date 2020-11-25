import { enableProdMode } from '@angular/core';

/**
 * Production environment setup function,
 * this function enables the Angular production
 * mode.
 *
 * The development file 'environment.ts' is
 * replaced with this file when the application
 * is built for production.
 */
export function setup() {
  // turns off assertions and other checks within Angular
  enableProdMode();
}
