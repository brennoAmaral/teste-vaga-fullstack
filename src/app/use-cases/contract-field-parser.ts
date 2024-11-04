import { ContractDTO, ContractDTOResponse, CsvContractLine, KeyContract } from "../../domain/entities/contract-entity"
import { IFormatter, IRegex } from "../../domain/interfaces/strategy-regex"
import CnpjRegex from "../formatters/cnpj"
import CpfRegex from "../formatters/cpf"
import { DateRegex } from "../formatters/date"
import MoneyRegex from "../formatters/money"
import { UCInstallmentUpdater, UseCaseInstallmentUpdater } from "./installment-fixing"


export interface UCContractFieldParser {
  execute(fields: CsvContractLine): ContractDTOResponse
}

export class UseCaseContractFieldsParser {
  constructor(
    protected readonly cpf: IRegex,
    protected readonly cnpj: IRegex,
    protected readonly money: IFormatter,
    protected readonly date: IFormatter,
    private readonly installmentFixer: UCInstallmentUpdater
   ){
   }
  execute(fields: CsvContractLine): ContractDTOResponse {
    const vlTotal = fields?.vlTotal
    const qtInstallment = fields?.qtPrestacoes
    if(vlTotal&&qtInstallment){
      this.installmentFixer.execute(fields as ContractDTO)
    }
    const getFirstTwoLetters = (str: string) => str.slice(0, 2)
    let formattedFields: ContractDTOResponse = {
      nrInst: 0,
      nrAgencia: 0,
      cdClient: 0,
      nmClient: "",
      nrCpfCnpj:"",
      nrContrato: 0,
      dtContrato: 0,
      qtPrestacoes: 0,
      vlTotal: "",
      cdProduto: 0,
      dsProduto: "",
      cdCarteira: 0,
      dsCarteira: "",
      nrProposta: 0,
      nrPresta: 0,
      tpPresta: "",
      nrSeqPre: 0,
      dtVctPre: "",
      vlPresta: "",
      vlMora: "",
      vlMulta: "",
      vlOutAcr: "",
      vlIof: "",
      vlDescon: "",
      vlAtual: "",
      idSituac: "",
      idSitVen: "",
    };

    Object.keys(fields).forEach((key: KeyContract) => {
      key = `${key}`
      if (key.length < 2) return

      const fieldValue = fields[key]
      const f2Letters = getFirstTwoLetters(key)

      const fieldIsMoney = f2Letters === "vl"
      if (fieldIsMoney) {
        formattedFields[key] = this.money.formatter(fieldValue)
        return
      }

      const fieldIsDate = f2Letters === "dt"
      if(fieldIsDate){
        formattedFields[key] = this.date.formatter(fieldValue)
        return
      }

      const fieldIsCpf = key === 'nrCpfCnpj' && fieldValue.length === 11
      if(fieldIsCpf){
        formattedFields[key] = this.cpf.formatter(fieldValue)
        return
      }

      const fieldIsCnpj = key === 'nrCpfCnpj' && fieldValue.length === 14
      if(fieldIsCnpj){
        formattedFields[key] = this.cnpj.formatter(fieldValue)
        return
      }

      if(key === 'nrCpfCnpj'){
        formattedFields[key] = fieldValue
        return
      }

      const fieldIsCode = f2Letters === "cd"
      const fieldIsNumber = f2Letters === "nr"
      if(fieldIsCode || fieldIsNumber){
        formattedFields[key] = Number(fieldValue)
        return
      }


      formattedFields[key] = fieldValue
    })
    return formattedFields
  }
}

export function FactoryContractFieldsParse(): UCContractFieldParser{
  return new UseCaseContractFieldsParser(
    new CpfRegex(),
    new CnpjRegex(),
    new MoneyRegex(),
    new DateRegex(),
    UseCaseInstallmentUpdater
  )
}