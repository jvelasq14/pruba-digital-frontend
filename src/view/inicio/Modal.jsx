import {useState, useEffect} from 'react'
import axios from "../../apis/index.js"
const Modal = () => {
    const [contactosIn, setContactosIn] = useState([]);

    useEffect(() => {
        getContactos()
    }, [])

    const [contacto, setContacto] = useState({
        cedula: "",
        nombre: "",
        apellidos: "",
        fecha_nacimiento: "",
        telefono: "",
        direccion: "",
        estado: 1

    });

    async function getContactos() {
        await axios.get("/contactos").then(response => { 
            setContactosIn(response.data);    
            console.log(response)       
        });
    }


    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contacto.cedula.trim()) {
            setError('El campo cedula es obligatorio')
            return
        }
        if (!contacto.nombre.trim()) {
            setError('El campo nombre es obligatorio')
            return
        }
        if (!contacto.apellidos.trim()) {
            setError('El campo apellido es obligatorio')
            return
        }
        if (!contacto.direccion.trim()) {
            setError('El campo direccion es obligatorio')
            return
        }
        if (!contacto.fecha_nacimiento.trim()) {
            setError('El campo fecha de nacimiento es obligatorio')
            return
        }
        if (!contacto.telefono.trim()) {
            setError('El campo telefono es obligatorio')
            return
        }
        await axios.post("/contactoscreate/", contacto).then(response => {
            setContacto({
                cedula: "",
                nombre: "",
                apellidos: "",
                fecha_nacimiento: "",
                telefono: "",
                direccion: ""
            });
            getContactos()
            setError(null)
        })
    };

    const onInputChange = (e) => {
        setContacto({ ...contacto, [e.target.name]: e.target.value });
    };


    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <h4>Insertar</h4>
                </button>
                <div class="modal" tabindex="-1" id="staticBackdrop" name="modalInsert" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="col-lg-12">
                                <div className="card ">
                                    <div className="card-header card-header-primary card-header-icon">
                                        <div className="card-icon">
                                            <i className="fal fa-qrcode fa-3x"></i>
                                        </div>
                                        <h3 className="card-title">Registrar Usuarios</h3>
                                    </div>
                                    <div className="card-body ">
                                        {
                                            error && (
                                                <div className='alert alert-danger mb-3'>{error}</div>
                                            )
                                        }
                                        <form id="formInsert" onSubmit={handleSubmit}>
                                            < div className="modal-body">
                                                <div className="row  pb-2">
                                                    <div className="row col-md-6">
                                                        <div className=" col-md-12">
                                                            <input type="text"
                                                                className="form-control"
                                                                placeholder="Nombre"
                                                                name='nombre'
                                                                value={contacto.nombre}
                                                                onChange={onInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row col-md-6">
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="Apellido"
                                                            name='apellidos'
                                                            value={contacto.apellidos}
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row  pb-2">
                                                    <div className="row col-md-6">
                                                        <div className=" col-md-12">
                                                            <input type="text"
                                                                className="form-control"
                                                                placeholder="Cedula"
                                                                name='cedula'
                                                                value={contacto.cedula}
                                                                onChange={onInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row col-md-6">
                                                        <input type="text"
                                                            class="form-control"
                                                            placeholder="Telefono"
                                                            name='telefono'
                                                            value={contacto.telefono}
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row  pb-2">
                                                    <div className="row col-md-6">
                                                        <div className=" col-md-12">
                                                            <input type="text"
                                                                className="form-control"
                                                                placeholder="Direccion"
                                                                name='direccion'
                                                                value={contacto.direccion}
                                                                onChange={onInputChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row col-md-6">
                                                        <input type="date"
                                                            class="form-control"
                                                            placeholder="Fecha Nacimiento"
                                                            name='fecha_nacimiento'
                                                            value={contacto.fecha_nacimiento}
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="card-footer">

                                                <div className="row">
                                                    <button type="submit" className="btn btn-primary" id="buttonInsert">AGREGAR</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='btn btn-primary'><h4>Cerrar Session</h4></button>
            </nav>

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Direccion</th>
                    </tr>
                </thead>
                <tbody>
                   {
                     contactosIn.map(element =>{
                        <tr>
                            <th>{element.nombre_completo}</th>
                            <th>{element.cedula}</th>
                            <th>{element.telefono}</th>
                            <th>{element.fecha_nacimiento}</th>
                            <th>{element.edad}</th>
                            <th>{element.direccion}</th>
                        </tr>
                     })
                   }
                </tbody>
            </table>
        </>
    )
}

export default Modal