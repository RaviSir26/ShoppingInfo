import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function ErrorPage(props) {
   let navigate =  useNavigate();
    return (
        <div>
            <center>
                <h1 style={{color : "red"}}>Product Not Found</h1>

               <Button variant="outline-success" onClick={()=> navigate('/')}>Shop Now</Button>
            </center>
        </div>
    );
}

export default ErrorPage;