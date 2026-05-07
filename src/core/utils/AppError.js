export class AppError extends Error {
  constructor({message, reason = '', code=500}) {
    super(message);
    this.reason = reason;
    this.code = code;
    this.name = 'AppError';
  }
}
