import { IFormatter } from "../../domain/interfaces/strategy-regex";

export class DateRegex implements IFormatter {
  formatter(value: string): string {
    const year = value.slice(0, 4)
    const mounth = value.slice(4, 6)
    const day = value.slice(6, 8)
    return `${day}/${mounth}/${year}`;
  }
}