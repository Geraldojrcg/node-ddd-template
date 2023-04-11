import { InvalidEmailError } from '../errors/invalid-email.error';
import { NameTooLongError } from '../errors/name-to-long.error';

type UserProperties = {
  id?: number;
  name: string;
  email: string;
};

export class User {
  private _id: number;
  private _name: string;
  private _email: string;

  constructor(props: UserProperties) {
    this._name = this.validateName(props.name);
    this._email = this.validateEmail(props.email);
    if (props.id) {
      this._id = props.id;
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  changeName(name: string) {
    this._name = this.validateName(name);
  }

  changeEmail(email: string) {
    this._email = this.validateEmail(email);
  }

  private validateName(name: string) {
    if (name.length > 40) {
      throw new NameTooLongError();
    }
    return name;
  }

  private validateEmail(email: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      throw new InvalidEmailError();
    }
    return email;
  }
}
