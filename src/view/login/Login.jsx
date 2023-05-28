import React from 'react'
import axios from '../../apis/index.js'
import iniAxiosInterceptors from '../../helpers/auth.js';
import { useNavigate } from 'react-router-dom';

iniAxiosInterceptors();

const Login = () => {
  const navigate = useNavigate()
    const [usuario, setUsuario] = React.useState({
        email: "",
        password: ""
    });

    const [error, setError] = React.useState(null);

        const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.email.trim()) {
          setError('El campo email es obligatorio')
          return
        }
        if(!usuario.password.trim()){
          setError('El campo password es obligatorio')
          return
        }

        await axios.post("/login/", usuario).then(response => {
          let token = response.data.access_token;
          localStorage.setItem('token', token);
          setUsuario({ email: "" , password: ""});
          setError(null)
          navigate("/contactos")
          
        })
      };

      const onInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
      };
    
    
    
    return (
        <div className='container'>
            <h3 className='text-center mt-5'>Log In</h3>
            <div className='row justify-content-center'>
                <div className="col-12 col-sm-10 col-md-6 col-xl-4">
{
            error && (
              <div className='alert alert-danger mb-3'>{error}</div>
            )
}

                    <form  onSubmit={handleSubmit}>

                        <input type="email"
                            className='form-control mb-3'
                            placeholder='Email'
                            name = 'email'
                            value={usuario.email} 
                            onChange={onInputChange} 
                        />

                        <input type="password"
                            className='form-control mb-3'
                            placeholder='password'
                            name = 'password'
                            value={usuario.password}
                             onChange={onInputChange} 
                        />

                        <div className='d-grid gap-2'>
                            <button className='btn btn-dark'>
                                Iniciar Session
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </div>

    )
}

export default Login