import { IFormatter } from "../../domain/interfaces/strategy-regex";

export default class MoneyRegex implements IFormatter {
  formatter(value: string): string {
    const money = Number(value)
    const locale = 'pt-BR'; 
    const formattedNumber = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL', 
    }).format(money);

    return `${formattedNumber}` ;
  }
}
