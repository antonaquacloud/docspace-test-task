export function generateUniqueName(prefix: string): string {
  const timestamp = Date.now();
  return `${prefix} - ${timestamp}`;
}

export function generateDocumentName(): string {
  return generateUniqueName("Test Document");
}

export function generateRoomName(): string {
  return generateUniqueName("Test Room");
}
