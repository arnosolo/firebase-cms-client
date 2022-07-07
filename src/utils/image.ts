export function importImage(name: string): string {
  return new URL(`../assets/${name}`, import.meta.url).href;
}