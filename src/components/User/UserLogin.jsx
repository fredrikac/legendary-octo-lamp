import { useState } from "react"
const UserLogin = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsernameHandler = (e) => {
    const value = e.target.value;

    setUsername(value);
    if(value.length > 0 && password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }

  const onChangePasswordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
    if(value.length > 0 && username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="username">Username/Email</label>
      <input 
      id='username'
      placeholder="username"
      onChange={onChangeUsernameHandler}
      />
      <label htmlFor="password">Password</label>
      <input 
      type='password' 
      id='password' 
      placeholder="password"
      onChange={onChangePasswordHandler}
       />
      <button disabled={buttonDisabled}>Login</button>
    </div>
  )
}

export default UserLogin