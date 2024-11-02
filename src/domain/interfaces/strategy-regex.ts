export interface IRegex{
  formatter(value: string): string
  hasMatch(value: string): boolean
}

export type IFormatter = Omit<IRegex, 'hasMatch'> 