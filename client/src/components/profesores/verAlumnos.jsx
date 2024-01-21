import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';



function VerAlumnos() {
    Axios.defaults.withCredentials = true;
    const location=useLocation()
    const { username } = useParams();
    const [User, setUser] = useState(location.state && location.state.User);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Axios.get(`http://localhost:3000/server/getProfeAlumno/${username}`);
            console.log('Datos obtenidos:', response.data);
          } catch (error) {
            console.error('Error al obtener datos:', error);
            // Manejar el error si es necesario
          }
        };
    
        if (!User && username) {
          fetchData();
        }
      }, [User, username]);



  return <div>verAlumnos</div>;
}

export default VerAlumnos