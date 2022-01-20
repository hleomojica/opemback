exports.contentEmail = (params) => {
    let mensaje = ""
    if (params.tipo === 1) {
        mesaje = `El acceso a su cuenta de la plataforma de OpemApp fue reestablesido con los siguientes datos:
        <ul>
            <li>Usuario: ${params.username}</li>
            <li>Contraseña: ${params.pass}</li>
        </ul>`
    }

    return `<div style="width: 100%;text-align: center;font-family: Tahoma">
                <table style="width: 60%;margin-left: auto;margin-right: auto;">
                    <tr>
                        <td style="background-image: url('seguridad.jpg');background-repeat:no-repeat;background-position:center 10%;background-size:100% 100%;width:600px;height:230px;">           
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 40px;">
                            <h3> Sr(a) ${params.nombre}</h3>                    
                            <p>${mensaje}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 80px;">
                            <p>Para mas informacion visite <a href="https://opem.com.co"> www.opem.com.co</a></p>
                            <small>Opem SAS</small>
                        </td>
                    </tr>
                </table>
            </div>`
};