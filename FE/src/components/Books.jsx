import React, {useState, useEffect} from 'react'
import { booksService } from '../services/users-service'
import UserForm from './userForm';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
export default function Books() {
  const navigate = useNavigate();
  const [booksList, setbooksList] = useState([]);
  const [userData, setuserData] = useState(null);
  const [isAddEditUser, setisAddEditUser] = useState(false);
  const [borrowDetails, setborrowDetails] = useState(null)
  const userEmail = localStorage.getItem('userEmail');
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  }

  useEffect(() => {

    const JWTToken = localStorage.getItem('token');
    if(JWTToken) {
      getBooks();
      booksService.getBorrowedDetails({ email: userEmail }).then(res => setborrowDetails(res.data))
    } else {
      navigate('/login');
    }

  }, []);

  const borrowBook = (data) => {
    booksService.borrowBook({ id: data._id, email: userEmail})
    .then(res => {
      if(res.status === 1) {
        alert('Borrowed Successfully')
        getBooks();
        booksService.getBorrowedDetails({ email: userEmail }).then(res => setborrowDetails(res.data))
      }
    })
  }

  const getBooks = () => {
    booksService.getBooks()
    .then(res => res.status && setbooksList(res.data))
  }
  
  return (
    <div>
      <section>
        <h1>Books</h1>
        <h5>Current Borrowed Books: {borrowDetails?.count}</h5>
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
                <th> Author </th>
                <th> Quantity </th>
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {
                booksList && booksList.map((item, index) => (
                  <tr key={item.name}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.qty}</td>
                        <td>
                          <button 
                            // style={{ 'backgroundColor': 'green' }} 
                            onClick={() => borrowBook(item)}
                            disabled={item.qty < 2 || borrowDetails?.count >= 2}
                          >Borrow</button> &nbsp;
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
