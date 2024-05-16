function get_time() {
    var fechaHoraActual = new Date();
    let dia = fechaHoraActual.getDate().toString().padStart(2, '0'); 
    let mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); 
    let hora = fechaHoraActual.getHours().toString().padStart(2, '0'); 
    let minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0'); 

    let nombre = fechaHoraActual.getFullYear() + "/" + mes + "/" + dia + " " + hora + ":" + minutos;
    return nombre;
}

module.exports = get_time