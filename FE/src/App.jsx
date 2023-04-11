import { useState, useEffect } from 'react'
import Books from './components/Books';
import Login from './components/Login';
import './App.css';
import {
  BrowserRouter,
  redirect,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    
    const JWTToken = localStorage.getItem('token');

    setisAuthenticated(Boolean(JWTToken));
  
  }, [isAuthenticated])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
                isAuthenticated ?
                <Books /> :
                <Login /> 
          }
        />
        <Route path="/books" element={<Books />} /> 
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
