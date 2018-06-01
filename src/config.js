const conf = {
    "production":{
        isMainNet:true,
        trxplorer:{
            url:"https://www.trxplorer.io",
            api:"https://api.trxplorer.io/v1",
        }
    },
    "development":{
        isMainNet:true,
        trxplorer:{
            url:"http://localhost:8080",
            api:"http://localhost:8383/v1"
        }
    }

}

export default conf[process.env.NODE_ENV]