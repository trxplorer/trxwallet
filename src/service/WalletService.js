import Lockr from 'lockr'
import {generateAccount} from '@tronprotocol/wallet-api/src/utils/account'
import {privateKeyToAddress,isAddressValid} from '@tronprotocol/wallet-api/src/utils/crypto'
import zxc from 'zxcvbn'
import CryptoJS from 'crypto-js'
import Config from '../config'

Lockr.prefix = 'trxwallet_'

export default {
    getPwdScore(pwd){
        return zxc(pwd).score
    },
    generate (){

        return generateAccount(Config.isMainNet)
    },
    addWallet (data){
        try{

            let wallet = {}
            let initSize = this.getWallets().length
            
            if (this.getWalletByLabel(data.label)){
                throw new Error('Wallet with label already exists') 
            }
            if (this.getWalletByAddress(data.address)){
                throw new Error('Wallet with label already exists') 
            }
            
            wallet.address = data.address
            wallet.cipher =  CryptoJS.AES.encrypt(data.pkey, data.password).toString()
            wallet.label = data.label

            Lockr.sadd("wallets",wallet)
            
            return this.getWallets().length > initSize
        }catch(e){
            console.error(e)
            return false
        }
    },
    getWalletByAddress(address){
        let wallets = this.getWallets()
        for (let index = 0; index < wallets.length; index++) {
            const element = wallets[index];
            if (element.address==address){
                return element
            }
        }
        return null
    },
    getWalletByLabel(label){
        let wallets = this.getWallets()
        for (let index = 0; index < wallets.length; index++) {
            const element = wallets[index];
            if (element.label==label){
                return element
            }
        }
        return null
    },
    getWallets(){
        return Lockr.smembers("wallets")
    },
    isValidAddress(address){
        return isAddressValid(address,Config.isMainNet)
    },
    privateKeyMatchAddress(pkey,address){
        if (pkey && address){
            return privateKeyToAddress(pkey,Config.isMainNet)===address
        }
        return false
    },
    getPkey(address,password){
        try{
            let wallet = this.getWalletByAddress(address)
            if (!wallet){
                throw new Error(`Could not find wallet with address ${address}`)
            }
            let bytes = CryptoJS.AES.decrypt(wallet.cipher,password)
            let result = bytes.toString(CryptoJS.enc.Utf8)
            return (!result || result=='' || result.length==0) ? null : result
        }catch(e){
            console.log(e.stack)
            return null
        }
    },
    removeWalletByAddress(address){
        let array = this.getWallets()
        let indexToRemove = -1
        let initSize = array.length
        for (let index = 0; index < array.length; index++) {
            let el  = array[index]
            if (el.address==address){
                indexToRemove = index
                break
            }
        }

        if (indexToRemove!=-1){
            array.splice(indexToRemove,1)
            if (array.length<initSize){
                Lockr.set("wallets",array)    
                return true                
            }
        }        

        return false
    },
    updateByAddress(address,wallet){
        let oldWallet = this.getWalletByAddress(address)
        this.removeWalletByAddress(address)
        wallet.cipher = oldWallet.cipher
        Lockr.sadd("wallets",wallet)
    },
    getLoggedUser(){
        let currentUser = Lockr.get('currentUser')
        return currentUser
    },
    isLogged(address){
        let currentUser = Lockr.get('currentUser')
        if (currentUser){
            if (currentUser.address==address){
                return true
            }
        }
        return false
    },
    login(address,password){
        if (this.isLogged(address)){
            return true
        }
        let pkey = this.getPkey(address,password)
        if (pkey){
            Lockr.set('currentUser',{address:address})
            return true
        }else{
            return false
        }
    },
    loggout(){
        Lockr.set('currentUser',null)
    }
}