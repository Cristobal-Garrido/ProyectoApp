function enviarCorreo() {
    var parametros = {
        usuario: document.getElementById("name").value,
        email: document.getElementById("email").value,
    }


    const serviceID = "servicio_gmail";
    const templateID = "Plantilla de Prueba";

    emailjs
        .init("94hwkOGrso9o2sECW")
        .send(serviceID, templateID, parametros)
        .then(
            res => {
                document.getElementById("name").value = "",
                    document.getElementById("email").value = "",
                    console.log(res);
                alert("El correo ha sido enviado con éxito");
            })
        .catch(err => console.log(err));

}