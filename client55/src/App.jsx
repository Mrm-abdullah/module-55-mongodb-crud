import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(name, email);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.insertedId) {
          alert('insertedId data')
          form.reset();
        }
        // const newUser = [...users, data]
        // setUsers(newUser)
      })

  }

  return (
    <>

      <h1>Module 55 CRUD oparation</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name='name' /> <br />
        <input type="email" name='email' /><br />
        <input type="submit" value='Submit' /><br />
      </form>

    </>
  )
}

export default App
