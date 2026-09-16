import React, { useState } from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!credentials.username.trim()) {
      newErrors.username = 'El nombre de usuario o correo es obligatorio.';
    }
    if (!credentials.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Simulación de autenticación en SITRE-COSITUC
    console.log('Iniciando sesión con:', credentials);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>SITRE-COSITUC - Iniciar Sesión</h2>
      {submitted && (
        <p style={{ color: 'green' }}>¡Validación exitosa! Enviando credenciales...</p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '0.25rem' }}>Usuario o Correo:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.username && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.username}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.25rem' }}>Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.password && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.password}</span>}
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}
