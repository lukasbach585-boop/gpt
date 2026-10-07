export function appBasePath(value = '/') {
  if (typeof value !== 'string' || !/^\/(?:[A-Za-z0-9_~.-]+\/)*$/.test(value) || value.split('/').some(part => part === '.' || part === '..')) {
    throw new Error('APP_BASE_PATH muss ein lokaler Pfad mit abschließendem / sein, z. B. / oder /gpt/.');
  }
  return value;
}
