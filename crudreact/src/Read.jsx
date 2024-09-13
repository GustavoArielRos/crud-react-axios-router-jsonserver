import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Read() {
    //state que irá armazenar os dados vindo da fake api
    const [data,setData] = useState([]);

    //pegando a id da URL
    const {id} = useParams();

    useEffect(() => {
        //eu vou pegar o dado de acordo com a id dele
        axios.get('http://localhost:5000/users/' + id)//tenho que colocar o id que vem da URL
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])//essa depedencia delimita quando oque esta dentro do useEffect ira rodar
          //no caso é um array vazio, ou seja, no caso vai ser sempre quando esse componente estiver vazio(quando ele se iniciar)
          //caso tenha um valor nesse array o useEffect é acionado toda vez que esse valor for mudado


    return(
        <div className='d-flex w-100 vh-100 justify-conent-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h3>Detail of User</h3>
                <div className='mb-2'>
                    <strong>Name: {data.name}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Email: {data.email}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Email: {data.phone}</strong>
                </div>
                <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </div>
        </div>
    )
}

export default Read;