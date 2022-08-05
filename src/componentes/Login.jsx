import React, { useRef, useState } from 'react';
import '../css/login.css';
const URL_LOGIN = "http://localhost/ws-login/login.php";

const enviarData = async (url, data) => {
    
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await resp.json();

    return json;


}

export default function Login(props){

    const [error, setError] = useState(null);
    const [espera, setEspera] =useState(false);

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin = async () => {
        setEspera(true);

        const data = {
            "usuario" : refUsuario.current.value,
            "clave" : refClave.current.value  
        };   
          
        const resp = await enviarData(URL_LOGIN, data);

        props.acceder(resp.conectado);
        setError(resp.error);
        setEspera(false);
    }


    return (
        <div className="login">
            <div className="row">
                <div className="col-sm-4 offset-4 mt-5">
                    <div className="card pt-5">
                        <div className="card-header text-center">
                            <h3>🌋 Iniciar</h3>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                    📧
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="email"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    ref={refUsuario}
                                    />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2">
                                    🔒
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="clave"
                                    aria-label="clave"
                                    aria-describedby="basic-addon2"
                                    ref={refClave}
                                    />
                            </div>

                            {
                                error &&
                                <div className="alert alert-danger">{error}</div>
                            }



                            <button className="btn btn-info btn-lg btn-block"
                            disabled={espera}
                            onClick={handleLogin}
                            >Acceder</button>

                            <div className="card-footer">
                                <span>¿Olvidó su contraseña?</span> <a href="https://">recuperar</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}