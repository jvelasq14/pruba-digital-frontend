import React from 'react'
import axios from "../../apis/index.js"

const Table = () => {
    React.useEffect(() => {
        getContactos()
    }, [])
    
    const [contactos, setContactos] = React.useState([]);

    async function getContactos() {
        await axios.get("/contactos").then(response => { 
            setContactos(response.data);           
            console.log(contactos);
        });
    }

    return (
        <div>
            <table className="table">
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
                    contactos.map(elemento=>{
                        <tr>
                            <td>{elemento.nombre_completo}</td>
                        </tr>
                    })
                   }
                </tbody>
            </table>
        </div>
    )
}

export default Table