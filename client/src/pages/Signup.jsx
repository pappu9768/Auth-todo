import React from 'react'
import './signup.css'
import { toast } from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom'
const Signup = () => {

    const navigate = useNavigate()
    const [user,setUser] = React.useState({
        name:'',
        email:'',
        password:''
    })
    const handleForm = async(e) => {
        e.preventDefault();
        console.log(user.name,user.email,user.password);

        try {
            const url = 'http://localhost:8080/auth/signup'
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(user)
            })
            const result = await res.json();
            console.log(result);

            const {success,error,message} = result;

            if(success){
                toast.success(message)
                navigate('/login')
            }else if(error){
                const Error = error.details[0].message
                toast.error(Error)
            }else if(!success){
                toast.error(message)
            }

        } catch (error) {
            toast.error("Server error")
            console.log("Error Found while posting data",error);
        }


    }
  return (
    <>
        <div className="signup">
            <form onSubmit={handleForm}>
                <h3>Sign Up</h3>

                <label htmlFor="name">Name:</label>
                <input type="text" name='name' placeholder='Enter your name' value={user.name} onChange={(e) => setUser({...user,name:e.target.value})}/>

                <label htmlFor="email">Email:</label>
                <input type="email" name='email' placeholder='Enter your email' value={user.email} onChange={(e) => setUser({...user,email:e.target.value})} />

                <label htmlFor="password">Password:</label>
                <input type="password" name ='password' placeholder='Enter your password' value={user.password} onChange={(e) => setUser({...user,password:e.target.value})} />

                <button type='submit'>SignUp</button>

            <Link to="/login" style={{color:"#000",marginTop:'12px'}}>Redirect to login</Link>

            </form>
        </div>
    
    </>
  )
}

export default Signup
