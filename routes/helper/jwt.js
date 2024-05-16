const token = require('jsonwebtoken')
async function jwt_bool(token_data){
    try{
        let tokenobj   = await token.verify(token_data, process.env.JWTPASS)
        if(!tokenobj.error){
            if(tokenobj["iat"] < tokenobj["exp"]){
                return {
                    estado:true,
                    user_red_jwt: tokenobj["USER_R"]
                }
            }else{
                return {
                    estado:false,
                    user_red_jwt: ""
                }
            }
        }else{
            return {
                estado:false,
                user_red_jwt: ""
            }
        }
    }catch(e){
        return {
            estado:false,
            user_red_jwt: ""
        }
    }
}

module.exports = jwt_bool