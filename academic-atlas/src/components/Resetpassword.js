import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "../styles/Resetpassword.css";
import userService from "../services/userService";
export default function Resetpassword() {
    const [data, setData] = React.useState({    pwd: "",    cnfpwd: ""  });
    const Navigate = useNavigate();
    console.log(data);
    const handlereset = async(e) => {
        e.preventDefault();
        if(data.pwd !== data.cnfpwd){
            alert("Passwords do not match");
        }
        else{
            alert("Password reset successful");
            try{
                const response = await userService.resetpwd(data.pwd);
                const sucess = response.data.success;
                if(sucess){
                    setTimeout(()=>{
                        Navigate('/')
                    },2000)
                }else{
                    alert('Reset Password Failed');
                }
            }   
            catch(err){
                console.log(err);
                alert('Reset Password Failed');
            }
        }

    }
    return (
        <div className="Resetpassword-page">
            <div className="Resetpassword-title">
                <h1>Reset your password</h1>
            </div>
            <div className="Resetpassword-form">
                <form action="">
                    
                    <div className="Resetpassword-form-component">
                        <label className="atlas-font" htmlFor="password">Password</label> <br />
                        <input className="atlas-input" 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="New password" 
                        value={data.pwd}
                        onChange={(e) => {
                            setData({ ...data, pwd: e.target.value });
                            
                        }}/>
                    </div>
                    <div className="Resetpassword-form-component">
                        <label className="atlas-font" htmlFor="confirm-password">Confirm Password</label> <br />
                        <input  className="atlas-input"
                        type="password" 
                        id="repeatpassword" 
                        name="repeatpassword" 
                        placeholder="Confirm password"
                         value={data.cnfpwd}
                         onChange={(e) => {
                            setData({ ...data, cnfpwd: e.target.value });
                            
                        } }/>
                    </div>
                    
                    <div className="rememberpassword-reset atlas-font">
                    Remember your password? <Link to="/Login" className="text-red-merry">Login</Link>
                    </div>
                    <div className="Resetpassword-btn">
                        <button className="atlas-btn" type="submit" onClick={handlereset}>Reset password</button>
                    </div>
                </form>
            </div>
        </div>
    );
}