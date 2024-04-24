import React from "react";
import {useState} from "react";

function Login() {
    const [inputEmail, setInputEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)


    const handleChange = (e) => {
        setInputEmail(e.target.value)
    }



return (
<div>
    <form>
        <label>Email</label>
        <input type="text" value={inputEmail} onChange={handleChange}/>
        <label>Password</label>
        <input type="text" value={password} onChange={handleChange}/>
        <label>Confirm Password</label>
        <input type="text" value={confirmPassword} onChange={handleChange}/>
    </form>
</div>)
}


export default Login;
