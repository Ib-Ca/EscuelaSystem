import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProcesoVer() {
    const { username } = useParams();
    const navigate = useNavigate();
  
  //check url y user log
    useEffect(() => {
      if (!(User && User.user.username === username)) {
        navigate('/home');
      }
    }, [User, username, navigate]);
  
  
    return (
      User && User.user.username === username ? (
        <>
        <div>hola</div>
        </>
      )  : 
         null
        
    );
  }

export default ProcesoVer