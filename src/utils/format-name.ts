export function getFirstName(name?: string | null): string {
  if (!name) return '';
  return name.split(' ')[0];
}

export function getLastName(name?: string | null): string {
  if (!name) return '';
  return name.split(' ')[1] ?? '';
}
