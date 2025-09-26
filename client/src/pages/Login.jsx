import React from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate();
    const [loginUser,setLoginUser] = React.useState({
        email:'',
        password:''
    })

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(loginUser.email,loginUser.password)
        try {
            const url = 'http://localhost:8080/auth/login';
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(loginUser)

            })

            const result = await res.json();
            console.log(result);

            const {success,error,message,jwtToken} = result

            if(success){
                toast.success(message)
                localStorage.setItem('Tokens',jwtToken);
                navigate('/home')
            }else if(error){
                const Error = error.details[0].message;
                toast.error(Error);
            }else if(!success){
                toast.error(message)
            }



        } catch (error) {
            toast.error();
            console.log("Error found while fetching login data",error)
        }
    }
  return (
    <>

    <div className="login">
        <form onSubmit={handleLogin}>
            <h3>Login</h3>

            <label htmlFor="email">Email:</label>
            <input type="text" name='email' placeholder='Enter Your email' value={loginUser.email} onChange={(e) => setLoginUser({...loginUser,email:e.target.value})}/>

            <label htmlFor="password">Password:</label>
            <input type="password" name='password' placeholder='Enter Your password' value={loginUser.password} onChange={(e) => setLoginUser({...loginUser,password:e.target.value})}/>

            <button type='submit'>Login</button>

            <Link to="/signup" style={{color:"#000",marginTop:'12px'}}>Redirect to signup</Link>
        </form>
    </div>
    </>
  )
}

export default Login
