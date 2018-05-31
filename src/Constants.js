export const TRX_SUN=1000000
export const TX_TYPE = {
    'freeze':{
        id:'freeze',
        label:'Freeze',
        description:'Freeze a certain amount of your available TRX. It will increase your TRON power and bandwidth',
        fee:'Free'
    },
    'unfreeze':{
        id:'unfreeze',
        label:'Unfreeze',
        description:'Unfreeze your frozen/locked TRX',
        fee:'Free'
    },
    'vote':{
        id:'vote',
        label:'Vote',
        description:'Vote for Super Representative' ,
        fee:'Free'
    },
    'createWitness':{
        id:'createWitness',
        label:'Apply for representative',
        description:'Applying as a representative will give you the ability to participate to TRON\'s ecosystem and get rewarded',
        fee:''
    },
    'updateWitness':{
        id:'updateWitness',
        label:'Update representative information',
        description:'Update account information about representative',
        fee:'Free'
    },
    'updateAccount':{
        id:'updateAccount',
        label:'Update account informations',
        description:'You can update some informations relative to your TRON\'s account.',
        fee:'Free'
    },
    'sendTRX':{
        id:'sendTRX',
        label:'Send TRX',
        description:'Transfer TRX from one account to another' ,
        fee:''
    },
    'sendToken':{
        id:'sendToken',
        label:'Send token',
        description:'Transfer a token from one account to another' ,
        fee:''
    }
}