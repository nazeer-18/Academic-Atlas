import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import userService from '../services/userService'

export default function Login() {
    const [data,setData] = useState({
        email:'',
        password:''
    })
    const Navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await userService.login(data);
            const sucess = response.data.success;
            if(sucess){
                setTimeout(()=>{
                    Navigate('/')
                },2000)
            }else{
                alert('Login Failed');
            }
        }   
        catch(err){
            console.log(err);
            alert('Login Failed');
        }
    }
    return (
        <div className="login-page">
            <div className="login-title atlas-title">
                Login
            </div>
            <div className="login-form">
                <form action="">
                    <div className="login-form-component">
                        <label className="atlas-font" htmlFor="">College Email</label> <br />
                        <input 
                            className="atlas-input" 
                            type="email" 
                            name="email" 
                            id="email"
                            onChange = {(e)=>setData({...data,email:e.target.value})} 
                            placeholder='Enter your email' />
                    </div>
                    <div className="login-form-component">
                        <label className="atlas-font" htmlFor="">Password</label> <br />
                        <input 
                            className="atlas-input" 
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange = {(e)=>setData({...data,password:e.target.value})}
                            placeholder='Enter your password' />
                    </div>
                    <div className="login-adds">
                        <div className="remember-me">
                            <input type="checkbox" name="remember-me" id="remember-me" />
                            <label className="atlas-font" htmlFor="remember-me">Remember Me!</label>
                        </div>
                        <div className="forgotPwd">
                            <Link className='text-red-merry' to="/forgotpwd">Forgot Password?</Link>
                        </div>
                    </div>
                    <div className="login-btn">
                        <button
                            className='atlas-btn'
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="noacnt-signup atlas-font">
                    Don't have an account? <Link to="/signupmail" className="text-red-merry">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
