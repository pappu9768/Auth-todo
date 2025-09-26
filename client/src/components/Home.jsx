import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Navbar from './Navbar.jsx';
import { MdDelete,MdUpdate } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [allTodos, setAllTodos] = useState([]);

    useEffect(() => {
        const getallUserTodos = async () => {
            try {
                const url = `http://localhost:8080/api/todo`;

                const getjwt = localStorage.getItem('Tokens');
                // console.log(getjwt)
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${getjwt}`,
                        'Content-type': 'application/json'
                    }
                });
                const result = await res.json();
                console.log(result.getTodos);
                setAllTodos(result.getTodos)


            } catch (error) {
                console.log(error)
            }
        }
        getallUserTodos();
    }, [])

    const handleDelete = async(todoid) =>{
        if (!window.confirm("Are you sure you want to delete this todo?")) return;

        try {
            const url = `http://localhost:8080/api/todo/${todoid}`
            const getjwt = localStorage.getItem('Tokens');
            
            const res = await fetch(url,{
                method:'DELETE',
                headers:{
                    'Authorization':`${getjwt}`,
                    'Content-type': 'application/json'
                }
            })

            setAllTodos(allTodos.filter((todo) => todo._id !== todoid))
            toast.success("Todo deleted successfully")
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <>

            <Navbar />
            <div className='main'>
                {

                    allTodos.length > 0 ? (
                        allTodos.map(value => (
                            <div key={value._id} className='container'>
                                <h4>{value.title}</h4>
                                <p>{value.content}</p>

                                <MdDelete className='del-icon' onClick={() => handleDelete(value._id)}/>
                                <MdUpdate className='upt-icon' onClick={() => navigate(`/update/${value._id}`)}/>
                            </div>
                        ))
                        
                    ) : (
                        <p>No todos found</p>
                    )



                }


            </div>
        </>
    )
}

export default Home
