import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
    const [error, setError] = useState(null);

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://parcial-back.vercel.app/?vercelToolbarCode=l-Jmf8e9sUUmtKX/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })  
            });
            const data = await response.json();

            if (response.status === 200) {
                callback(data.role);  
                if (data.role === 'admin') {
                    goTo("/adminHome"); 
                } else {
                    goTo("/userHome");
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
        }
    };
    const handleRegisterRedirect = () => {
        goTo("/RegisterForm");  // Redirige a la ruta de registro
    };
    /*const validateUser = (event)=>{
        event.preventDefault();
        if(username === 'user' && password === 'user2023'){
            callback("user");
            goTo("/userHome");
        }else if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/adminHome");
        }
    }*/
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar errores */}
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
            <button type="button" onClick={handleRegisterRedirect} id="btnRegistro">Registrarse</button>
        </form>
    )
}

export default Form;