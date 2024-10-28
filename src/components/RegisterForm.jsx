import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterForm.css'


function RegisterForm({ callback }) {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        email: '',
        phone: '',
        id: '',
        city: '',
        password: '',
    });
    const goTo = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/signos/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.status === 200) {
                callback(data.role);  
                goTo("/successPage"); // Redirige a una página de éxito o bienvenida
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Error al conectar con el servidor.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 id="txtBienvenida">Regístrate en nuestro portal del Zodiaco</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar errores */}

            <label className="txt">Nombre Completo</label>
            <input type="text" name="name" className="entry" onChange={handleChange} required /><br />

            <label className="txt">Fecha de Nacimiento</label>
            <input type="date" name="birthDate" className="entry" onChange={handleChange} required /><br />

            <label className="txt">Correo Electrónico</label>
            <input type="email" name="email" className="entry" onChange={handleChange} required /><br />

            <label className="txt">Celular</label>
            <input type="tel" name="phone" className="entry" pattern="[0-9]{10}" onChange={handleChange} required /><br />

            <label className="txt">Cédula</label>
            <input type="text" name="id" className="entry" onChange={handleChange} required /><br />

            <label className="txt">Ciudad</label>
            <input type="text" name="city" className="entry" onChange={handleChange} required /><br />

            <label className="txt">Contraseña</label>
            <input type="password" name="password" className="entry" onChange={handleChange} required /><br />

            <input type="submit" value="Registrarse" id="btnRegistro" />
        </form>
    );
}

export default RegisterForm;