import * as responses from '../utils/responses.js';
import { logError } from '../utils/logger.js';

export const errorMiddleware = (error, req, res, next) => {
  const status = error.code || 500;
  const message = error.message || 'Erro interno do servidor';
  const reason = error.reason || '';

  logError({ error, req, status, message });

  switch (status) {
    case 400:
      return responses.badRequest(res, { message, error: reason });
    case 401:
      return responses.unauthorized(res, { message, error:reason });
    case 403:
      return responses.forbidden(res, { message, error: reason });
    case 404:
      return responses.notFound(res, { message, error: reason });
    case 409:
      return responses.conflict(res, { message, error: reason });
    case 498:
      return responses.invalidToken(res, { message, error: reason });
    default:
      return responses.error(res, { status, message, error: reason });
  }
};
