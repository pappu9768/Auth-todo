import React from 'react'
import { MdArrowBack } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import './create.css'
import { toast } from 'react-toastify';
const Create = () => {

    const [todos, setTodos] = React.useState({
        title: '',
        content: ''
    })
    const navigate = useNavigate();

    const handleCreate = async(e) => {
        e.preventDefault();
        console.log(todos)

        try {
            const url = 'http://localhost:8080/api/todo/create';
            const jwtToken = localStorage.getItem('Tokens');

            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Authorization':`${jwtToken}`,
                    'Content-type':'application/json'
                },
                body:JSON.stringify(todos)
            })

            const result = await res.json();
            console.log(result);

            const {error,message,success} = result;

            if(success){
                toast.success(message);
                navigate('/home')
            }else if(error){
                toast.error(error.details[0].message)
            }else if(!success){
                toast.error(message);
            }
            return res.status(201).json({
                message:"Todo created",
                result
            })
        } catch (error) {
            return res.json({
                message:"Error found while sending data",
                error
            })
        }
    }

    return (
        <>
            <Link to='/home'><MdArrowBack /><span>Back to home</span></Link>

            <div className='createTodoMain'>

                <div className="createTodo">
                    <form onSubmit={handleCreate}>
                        <h4>Create Todo</h4>

                        <label htmlFor="title">Title:</label>
                        <input type="text" name='title' placeholder='Enter your Todo' value={todos.title} onChange={(e) => setTodos({ ...todos, [e.target.name]: e.target.value })} />

                        <label htmlFor="content">Content:</label>
                        <input type="text" name='content' placeholder='Enter your Todo`s content' value={todos.content} onChange={(e) => setTodos({ ...todos, [e.target.name]: e.target.value })} />


                        <button type='submit'>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Create
