import { IRegex } from "../../domain/interfaces/strategy-regex";

export default class CnpjRegex implements IRegex {
  readonly regex = /^(?!.*(\d)\1{13})(?!00000000000000)(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})\-(\d{2})$/
  formatter(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length !== 14) {
      return ''
    }

    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  }

  hasMatch(value: string): boolean {
    const formatedValue = this.formatter(value)
    
    if(!formatedValue){
      return false
    }
    return this.regex.test(formatedValue)
  }
}