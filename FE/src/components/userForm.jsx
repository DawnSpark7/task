import React,{useState, useEffect} from 'react'
import { UsersService } from '../services/users-service';
export default function UserForm({ userData }) {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');

  useEffect(() => {

    if(userData) {
      setname(userData.name);
      setemail(userData.email);
    }

  }, []);

  const submitForm = () => {

    const payload = {
      name,
      email,
      password
    }

    if(userData) {
      UsersService.updateUser(userData._id)
      .then(res => {
        if(res.status) {
          alert('Successful');
          window.location.reload();
        }
      })
    } else {
      UsersService.addUser(payload)
      .then(res => {
        if(res.status) {
          alert('Successful');
          window.location.reload();
        }
      })
    }
  }

  return (
    <div>
        <h3>User Form</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}>
          <input type="text" value={name} placeholder="Enter name" onChange={(e) => setname(e.target.value)} required /> <br/>
          <input type="email" value={email} placeholder="Enter email address" onChange={(e) => setemail(e.target.value)} required /> <br/>
          <input type="password" placeholder='Enter password' onChange={(e) => setpassword(e.target.value)} required /><br />
          <p style={{ display: `${error} ? 'block' : 'none'` }}>{error}</p>
          <input type="submit" value="submit" /> &nbsp;
          <input type="reset" value="reset" onClick={() => seterror('')}/>
        </form>
    </div>
  )
}
