export class InvalidEmailError extends Error {
  constructor() {
    super('This email is invalid or mal formated');
    this.name = 'InvalidEmailError';
  }
}
