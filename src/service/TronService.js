import TronCli from 'tron-api-cli';
import TRXWalletConfig from 'TRXWalletConfig'

const tronCli = new TronCli({endpoint:TRXWalletConfig.trxplorer.api})

export default tronCli