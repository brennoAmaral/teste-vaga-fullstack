export interface StratgyFileParser<T> {
  execute(filePath: string): Promise<T>
}
