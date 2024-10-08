import React from 'react'
import {useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
    //state que vai armazenar os dados vindo a fake api(json)
    const [data, setData] = useState([])

    

    //vai carregar nossos dados do "backend"(json)
    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    //função de deletar
    const handleDelete = (id) => {
        //variável que vai ser aquele win
        //se for ok, o confirm é true se for cancelar o confirm é false
        const confirm = window.confirm("Você gostaria de deletar?")
        if(confirm) {
            axios.delete('http://localhost:5000/users/' + id)
            .then(res => {
                window.location.reload();//recarregando a página
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Users</h1>
            <div className= 'w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    {/*fazendo o link para levar o usuário até a pagina "create" quando clicka no botão*/}
                    <Link to="/create" className='btn btn-success'>Add +</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            //fazendo o map para percorrer os dados
                            //d --> é o dado , i --> é o index
                            //como o json ta organizado em objetos, o "d" é como se fosse um objeto sendo percorrido
                            data.map((d,i) =>(
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>
                                        <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                        <Link to={`/update/${d.id}`}className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button onClick={ e => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                                        {/*onClick é um evento que ocorre quando o botão onde ele está é clickado, no caso ele chama a função */}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>       
                </table>
            </div>

        </div>
    )
}

export default Home;