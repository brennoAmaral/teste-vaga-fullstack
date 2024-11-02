import { IRegex } from "../../domain/interfaces/strategy-regex";

export default class CpfRegex implements IRegex {

  readonly regex = /^(?!.*(\d)\1{10})(?!00000000000)(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/;

  formatter(value: string): string{
    const numbers = value.replace(/\D/g, '');
    if (numbers.length !== 11) {
      return ''
    }

    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }

  hasMatch(value: string): boolean {
    const formattedValue = this.formatter(value);

    if (!formattedValue) {
      return false;
    }

    return this.regex.test(formattedValue);
  }
}
