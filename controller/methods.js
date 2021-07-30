
const { randomBytes} =require('crypto')

generateKey=()=>{
    return randomBytes(5).toString('hex');
}

module.exports={
    generateKey
}