import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    fetch('http://localhost:3010/users')
    .then((response) => response.json()
    .then((data) => setUsers(data)))
  }, [])

  return (
    <section data-testid='user-list-component'>
      <h1>All users</h1>
      <ul>
        {users.map((user, i)=> (
          <li key={i}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UserList