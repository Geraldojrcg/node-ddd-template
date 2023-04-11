export class NameTooLongError extends Error {
  constructor() {
    super('The name must have less than or equal 40 caracters');
    this.name = 'NameTooLongError';
  }
}
