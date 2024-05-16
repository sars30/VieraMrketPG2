function jsonres(codigo, mensaje){
    if((codigo != null && codigo != "") && (mensaje != null && mensaje != "")){
        return {
            "codigo": codigo,
            "mensaje": mensaje
        }
    }else{
        return{
            "codigo" :400,
            "mensaje": "Parametros no validos"
        }
    }
}

module.exports = jsonres