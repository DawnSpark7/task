import React,{useState, useEffect} from 'react'
import { booksService } from '../services/users-service';
export default function UserForm({ userData }) {

  const [name, setname] = useState('');
  const [author, setauthor] = useState('');
  const [qty, setqty] = useState('');
  const [error, seterror] = useState('');

  useEffect(() => {

    if(userData) {
      setname(userData.name);
      setauthor(userData.author);
    }

  }, []);

  const submitForm = () => {

    const payload = {
      name,
      author,
      qty
    }

    if(userData) {
      booksService.updateBook(userData._id)
      .then(res => {
        if(res.status) {
          alert('Successful');
          window.location.reload();
        }
      })
    } else {
      booksService.addBook(payload)
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
          <input type="text" placeholder="Enter name" onChange={(e) => setname(e.target.value)} required /> <br/>
          <input type="text" placeholder="Enter author" onChange={(e) => setauthor(e.target.value)} required /> <br/>
          <input type="text" placeholder='Enter quantity' onChange={(e) => setqty(e.target.value)} required /><br />
          <p style={{ display: `${error} ? 'block' : 'none'` }}>{error}</p>
          <input type="submit" value="submit" /> &nbsp;
          <input type="reset" value="reset" onClick={() => seterror('')}/>
        </form>
    </div>
  )
}
