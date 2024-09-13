import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Create() {
    //criando um state que se inicializará como um objeto vazio
    const [values, setValues] = useState({
        name:'',
        email: '',
        phone: '',
    })

    //usar o useNavigate para navegar entre as páginas
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        //perceba que agora eu uso o "post", e estou enviando o state 
        axios.post('http://localhost:5000/users', values)
        .then(res => {
            console.log(res);
            navigate('/');//voltando para página 'HOME' quando receber a resposta
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className = 'w-50 border bg-white shadow px-5 pt-3 pb-5 rounder'>
                <h1>Add a User</h1>
                <form onSubmit={handleSubmit}>{/*quando eu submeter esse formulário vou acionar a função "handlesubmit" */}
                    <div className='mb-2'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Name' 
                        onChange={(e) => setValues({...values, name: e.target.value})}/>
                        {/*Eu o ...values para pegar os valores que já existem no objeto
                           no caso ele por agora esta todo vazio ,porém na hora de eu colocar o email a gente usa o valor que foi preenchido no "name".
                           Isso é uma forma de não perder os valores anteriores */}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email"
                        onChange={(e) => setValues({...values, email: e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name='phone' className='form-control' placeholder='Enter Phone' 
                        onChange={(e) => setValues({...values, phone: e.target.value})}/>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    {/*criando o Link para voltar a página "Home" */}
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    )
}

export default Create