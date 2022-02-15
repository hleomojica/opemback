exports.contentEmail = (params) => {
    let mensaje = ""
    if (params.tipo === 1) {
        mensaje = `El acceso a su cuenta de la plataforma OpemApp fue restablecido con los siguientes datos:
        <ul>
            <li>Usuario: ${params.username}</li>
            <li>Contraseña: ${params.pass}</li>
        </ul>`
    } else if (params.tipo === 2) {
        mensaje = `El certificado se encuentra disponible`
    }

    return `<div style="width:100%;text-align:center;font-family:Tahoma">
                <table style="width: 60%;margin-left: auto;margin-right: auto;">
                    <tr>
                        <td style="background-size:100% 100%;width:600px;height:230px;">           
                            <img src="cid:logo" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 40px;text-align:left">
                            <h3> Sr(a) ${params.nombre}</h3>
                            <p>${mensaje}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top:80px;text-align:left">
                            <p>Para mas informacion visite <a href="https://opem.com.co"> opem.com.co</a></p>
                            <small>OPEM SAS</small>
                        </td>
                    </tr>
                </table>
            </div>`
};