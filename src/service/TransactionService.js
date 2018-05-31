import TronService from './TronService'
import {TRX_SUN,TX_TYPE} from '../Constants'

const service = {

    [TX_TYPE.freeze.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).freeze((transaction.amount*TRX_SUN),3,node)
    },
    [TX_TYPE.unfreeze.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).unfreeze(node)
    },
    [TX_TYPE.createWitness.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).createWitness(transaction.url,node)
    },
    [TX_TYPE.updateWitness.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).updateWitness(transaction.url,node)
    },
    [TX_TYPE.updateAccount.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).update(transaction.name,node)
    },
    [TX_TYPE.sendTRX.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).sendTRX(transaction.to,transaction.amount*TRX_SUN,node)
    },
    [TX_TYPE.sendToken.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).sendToken(transaction.to,transaction.token,transaction.amount,node)
    },
    [TX_TYPE.vote.id](address,transaction,pkey,node){
        return TronService.account(address,pkey).vote(transaction.votes,node)
    },
    send(address,transaction,pkey,node){
        console.log(transaction)
        return this[transaction._type](address,transaction,pkey,node)

    }

}

export default service