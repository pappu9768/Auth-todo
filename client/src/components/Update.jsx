import React, { useEffect } from 'react'
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {

    const { id } = useParams();
    useEffect(() => {
        const getTodosToUpdate = async () => {
            try {
                const url = `http://localhost:8080/api/todo/${id}`;
                const jwtToken = localStorage.getItem('Tokens')

                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${jwtToken}`,
                        'Content-type': 'application/json'
                    }

                })

                const result = await res.json();
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }

        getTodosToUpdate();
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="updateTodoMain">
                <Link to="/home"><MdArrowBack />Back to home</Link>

                <div className="createTodo">

                    <form onSubmit={handleUpdate}>
                        <h4>Update Todo</h4>

                        <label htmlFor="title">Title:</label>
                        <input type="text" name='title' placeholder='Enter your Todo' />

                        <label htmlFor="content">Content:</label>
                        <input type="text" name='content' placeholder='Enter your Todo`s content' />

                        <button type='submit'>Update</button>

                    </form>
                </div>
            </div>


        </>
    )
}

export default Update
