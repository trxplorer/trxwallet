import TronCli from 'tron-api-cli';
import TRXWalletConfig from '../config'

const tronCli = new TronCli({endpoint:TRXWalletConfig.trxplorer.api})

export default tronCli