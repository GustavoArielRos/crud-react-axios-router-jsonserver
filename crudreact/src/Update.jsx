import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Update() {

    //const [data, setData] = useState([]);
    const [values, setValues] = useState({
      name: '',
      email: '',
      phone: ''  
    })
    //pegando o id da URL
    const { id } = useParams();
    //com o navigate podemos navegar entre as páginas
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get('http://localhost:5000/users/' + id)
             .then(res => {
                setValues(res.data);
             })
             .catch(err => console.log(err));
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault();
        //adicionando o valor do state "values" nesse id
        axios.put('http://localhost:5000/users/' + id,values)
             .then(res =>{
                navigate('/');//voltar a página principal
             })
             .catch(err => console.log(err))
    }


    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className = 'w-50 border bg-white shadow px-5 pt-3 pb-5 rounder'>
                <h1>Update User</h1>
                <form onSubmit={(handleUpdate)} > {/*quando der submit essa função será chamada */}
                    <div className='mb-2'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Name' 
                        value={values.name} //esse value é o valor que vai aparecer nesse input
                        onChange={(e) => setValues({...values, name: e.target.value})} //adicionando o valor(name) no objeto do state values
                        />            
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email"
                        value={values.email}//esse value é o valor que vai aparecer nesse input
                        onChange={(e) => setValues({...values, email: e.target.value})}//adicionando o valor(name) no objeto do state values
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name='phone' className='form-control' placeholder='Enter Phone' 
                        value={values.phone}//esse value é o valor que vai aparecer nesse input
                        onChange={(e) => setValues({...values, phone: e.target.value})}//adicionando o valor(name) no objeto do state values
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    {/*criando o Link para voltar a página "Home" */}
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    )
}

export default Update;