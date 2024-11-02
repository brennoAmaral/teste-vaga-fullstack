import csv from 'csv-parser';
import * as fs from 'fs';
import { ContractDTOResponse, CsvContractLine } from '../domain/entities/contract-entity';
import { StratgyFileParser } from '../domain/interfaces/strategy-file-parser';
import { FactoryContractFieldsParse, UCContractFieldParser } from './use-cases/contract-field-parser';


export default class ContractCsvParser implements StratgyFileParser<ContractDTOResponse[]> {

  constructor(
    private readonly lineParser: UCContractFieldParser 
  ){}
  
  async execute(filePath: string): Promise<ContractDTOResponse[]> {
    const results: ContractDTOResponse[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath) 
        .pipe(csv())
        .on('data', (data: CsvContractLine) => {
          const formattedLine = this.lineParser.execute(data);
          results.push(formattedLine);
        })
        .on('end', () => {
          resolve(results); 
        })
        .on('error', (error) => {
          reject(error); 
        });
    });
  }
}


export function FactoryContractCsvParser(){
  const contractFieldsParser = FactoryContractFieldsParse()
  return new ContractCsvParser(contractFieldsParser)
} 