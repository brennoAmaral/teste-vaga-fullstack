import { ContractDTO } from "../../domain/entities/contract-entity"


export interface UCInstallmentUpdater{
  execute(contract: ContractDTO):void
}

export class UseCaseInstallmentUpdater{
  static execute(contract: ContractDTO):void{
    const vlTotal = Number(contract.vlTotal)
    const qtInstallment = Number(contract.qtPrestacoes)
    const newIntstallment = vlTotal/qtInstallment 
    const hasDifferentInstallments = newIntstallment != contract.vlPresta
    if(hasDifferentInstallments){
      contract.vlPresta = newIntstallment
    }
  }
}
