const toTimestamp = () => new Date().toISOString();

const buildErrorLogPayload = ({ error, req, status, message }) => ({
  timestamp: toTimestamp(),
  method: req?.method || '',
  url: req?.originalUrl || req?.url || '',
  status,
  message,
  stack: error?.stack || ''
});

export const logError = ({ error, req, status, message }) => {
  const payload = buildErrorLogPayload({ error, req, status, message });
  console.error('[ERROR_MIDDLEWARE]', payload);
};
