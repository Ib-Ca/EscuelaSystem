import  Axios  from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';



function VerAlumnos() {
    Axios.defaults.withCredentials = true;
    const { username } = useParams();
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
    
        if (username) {
          fetchData();
        }
      }, [username]);





    console.log("User:", username);
  return <div>verAlumnos</div>;
}

export default VerAlumnos