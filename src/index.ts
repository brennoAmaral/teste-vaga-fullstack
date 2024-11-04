import { FactoryContractCsvParser } from './app/csv-parser';

const test = await FactoryContractCsvParser().execute('./src/data.csv')

//customize aqui a visualização dos valores

console.log(test)