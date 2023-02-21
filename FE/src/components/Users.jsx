import React, {useState, useEffect} from 'react'
import { UsersService } from '../services/users-service'
import UserForm from './userForm';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
export default function Users() {
  const navigate = useNavigate();
  const [usersList, setusersList] = useState([]);
  const [userData, setuserData] = useState(null);
  const [isAddEditUser, setisAddEditUser] = useState(false);

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  }

  useEffect(() => {

    const JWTToken = localStorage.getItem('token');

    JWTToken ? getUsers() : navigate('/login');

  }, []);

  const updateUser = (data) => {
    setuserData(data);
    setisAddEditUser(true);
  }

  const deleteUser = (id) => {
    UsersService.deleteUser(id)
    .then(res => {
      if(res.status) {
        alert('Successful!')
        getUsers()
      } else {
        alert('Something went wrong!');
      }
    })
  }

  const getUsers = () => {
    UsersService.getUsers()
    .then(res => res.status && setusersList(res.data))
  }
  
  return (
    <div>
      <section>
        <h1>Users</h1>
        {!isAddEditUser && <button onClick={() => updateUser(null)}>Add</button>} &nbsp;
        <Link to="/login"><button onClick={logout} style={{ 'backgroundColor': 'grey' }}>Logout</button></Link>
      </section>
      {isAddEditUser ? 
        <UserForm userData={userData} />
        :
        <section style={{ 'textAlign': 'left' }}>
          <table>
            <thead>
              <tr>
                <th> Sr No. </th>
                <th> Name </th>
                <th> Email </th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {
                usersList && usersList.map((item, index) => (
                  <tr key={item.name}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <button style={{ 'backgroundColor': 'green' }} onClick={() => updateUser(item)}>Update</button> &nbsp;
                          <button style={{ 'backgroundColor': 'red' }} onClick={() => deleteUser(item._id)}>Delete</button>
                        </td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </section>
      }
    </div>
  )
}
