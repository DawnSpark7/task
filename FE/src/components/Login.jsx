import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../services/login-service';

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('')

  const validateLogin = () => {
    const payload = {
      email, password
    }

    LoginService.login(payload)
    .then(res => {
      
      if(res.status) {
        localStorage.setItem('token', res.data?.token)
        navigate('/users')
      } else {
        seterror(res.message)
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
          e.preventDefault();
          validateLogin();
      }}>
        <input type="email" placeholder="Enter email address" onChange={(e) => setemail(e.target.value)} required /> <br/>
        <input type="password" placeholder='Enter password' onChange={(e) => setpassword(e.target.value)} required /> <br/>
        <p style={{ display: `${error} ? 'block' : 'none'` }}>{error}</p>
        <input type="submit" value="submit" /> &nbsp;
        <input type="reset" value="reset" onClick={() => seterror('')}/>
      </form>
    </div>
  )
}
