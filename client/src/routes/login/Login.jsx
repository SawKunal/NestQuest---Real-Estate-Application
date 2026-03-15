import "./login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContxt';
function Login() {

  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {currentUser, updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    // console.log(username, email, password);

    try{
      const res = await apiRequest.post('/auth/login', {
        username,
        password
      })

      updateUser(res.data)


      navigate('/');
    } catch(err){
      console.log(err)
      setErr(err.response.data.message)
    } finally{
      setIsLoading(false);
    }
  }



  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required minLength={3} maxLength={20} type="password" placeholder="Password" />
          <button disabled={isLoading} type="submit">Login</button>
          {err && <span>{err}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;