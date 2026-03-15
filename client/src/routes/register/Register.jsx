import './register.scss'
// import axios from 'axios';
import apiRequest from '../../lib/apiRequest';
import {useState} from 'react';

import {Link, useNavigate} from 'react-router-dom';

function Register(){

    const [err, setErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        // console.log(username, email, password);

        try{
            setIsLoading(true);
            const res = await apiRequest.post('/auth/register', {
            username,
            email,
            password
        })
        navigate('/login')
        } catch(err){
            console.log(err.response.data.message)
            setErr(err.response.data.message)
        } finally{
            setIsLoading(false);
        }        

    }
    return(
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
                    <input name='username' type='text' placeholder='Username' />
                    <input name='email' type='email' placeholder='Email' />
                    <input name='password' type='password' placeholder='password' />
                    <button disabled={isLoading} type='submit'>Register</button>
                    {err && <span>{err}</span>}
                    <Link to='/login'>Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default Register