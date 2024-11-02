export interface ContractDTO {
  [key: string]: string | number;
  nrInst: number
  nrAgencia: number
  cdClient: number
  nmClient: string
  nrCpfCnpj: number
  nrContrato: number
  dtContrato: number
  qtPrestacoes: number
  vlTotal: number
  cdProduto: number
  dsProduto: string
  cdCarteira: number
  dsCarteira: string
  nrProposta: number
  nrPresta: number
  tpPresta: string
  nrSeqPre: number
  dtVctPre: number
  vlPresta: number
  vlMora: number
  vlMulta: number
  vlOutAcr: number
  vlIof: number
  vlDescon: number
  vlAtual: number
  idSituac: string
  idSitVen: string
}

export interface ContractDTOResponse {
  [key: string]: any;
  nrInst: number
  nrAgencia: number
  cdClient: number
  nmClient: string
  nrCpfCnpj: number
  nrContrato: number
  dtContrato: number
  qtPrestacoes: number
  vlTotal: string
  cdProduto: number
  dsProduto: string
  cdCarteira: number
  dsCarteira: string
  nrProposta: number
  nrPresta: number
  tpPresta: string
  nrSeqPre: number
  dtVctPre: string
  vlPresta: string
  vlMora: string
  vlMulta: string
  vlOutAcr: string
  vlIof: string
  vlDescon: string
  vlAtual: string
  idSituac: string
  idSitVen: string
}

export type KeyContract = keyof ContractDTO

export type CsvContractLine = Record<keyof ContractDTO, string>
