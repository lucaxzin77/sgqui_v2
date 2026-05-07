import { AppError } from '../utils/AppError.js';

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.error('Validation error:', result.error);
        throw new AppError({
            message: 'Dados inválidos',
            reason: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
            code: 400
        });
    }

    req.body = result.data;
    next();
};