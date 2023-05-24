import React from 'react';
import "../styles/index.css";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('pass').value;
    // Aquí se puede agregar lógica de autenticación
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "dashboard.html";
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h3>INICIO DE SESIÓN</h3>
        <img src="https://www.corantioquia.gov.co/wp-content/uploads/2022/01/Logo-Corantioquia-700px-x-450px-JPG.jpg"
          alt="Logo_Corantioquia" id="img" />
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="usuario" name="username" required />
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="pass" name="password" required />
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
}

export default Login;