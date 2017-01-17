export function buildUrl(
  protocol: string,
  host: string,
  port: string|number,
  path: string
) {
  let hostPart = host || '';
  hostPart = port ? `${hostPart}:${port}` : hostPart;
  const start = (protocol && hostPart) ? `${protocol}://${hostPart}` : '';
  const slash = (start && path.indexOf('/') !== 0) ? '/' : '';
  return `${start}${slash}${path}`;
}
