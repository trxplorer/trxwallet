<template>
  <div id="app">

    <span>Address:</span><input type="text" v-model="address"/>
    <span>Private Key:</span><input type="text" v-model="pkey"/>
    <button @click="genWallet()">Generate wallet</button>
    <button @click="login()">Login</button>
    <br><br><br>
    <button @click="signTransaction()">Sign Transaction</button>
  </div>
</template>
<script>
import {generateAccount} from '@tronprotocol/wallet-api/src/utils/account'
import {privateKeyToAddress,signTransaction} from "@tronprotocol/wallet-api/src/utils/crypto";
import {base64DecodeFromString,byteArray2hexStr} from "@tronprotocol/wallet-api/src/utils/bytes";
import axios from "axios";
import T from './protojs/Tron_pb';
export default {
  name: 'app',
  data () {
    return {
      pkey: '',
      address:''
    }
  },
  methods:{
    genWallet () {
      const account = generateAccount()
      this.address = account.address;
      this.pkey = account.privateKey;
    },
    signTransaction () {
      
      //console.log(tx);
      //signTransaction(this.pkey,tx)
      //console.log(new T.Transaction().serializeBinary());
      axios.get('http://localhost:8080/api/account/update').then((res) => {
        console.log(res.data)
        let data = base64DecodeFromString(res.data);
        let tx = T.Transaction.deserializeBinary(data);
        console.log(this.pkey);
        let signedTx = signTransaction(this.pkey,tx);
        let transactionBytes = signedTx.serializeBinary();
        let transactionString = byteArray2hexStr(transactionBytes);
        console.log("sending signed transaction");
        return axios.post('http://localhost:8080/api/tron/broadcast',{payload:transactionString});

      }).then((res) => {
        console.log(res);
      }).catch((e)=>{
        console.error(e);
      });
    },
    login () {
      this.address = privateKeyToAddress(this.pkey);
      alert('Login successfull !!');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
