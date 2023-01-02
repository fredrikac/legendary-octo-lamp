import { useState } from "react";

const RegisterUser = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChangePasswordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
    setButtonDisabled(value !== confirmPassword);
  };

  const onChangeConfirmPasswordHandler = (e) => {
    const value = e.target.value;
    setConfirmPassword(value)
    setButtonDisabled(value !== password)
  };

  const onSave = (e) => {
    e.preventDefault();
    const body = { userName, email };

    //sökvägen till fejk-api
    fetch('http://localhost:3010/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(body),
    })
  }

  return (
    <section data-testid='add-user-component'>
      <h1>Register New User</h1>
      <form onSubmit={onSave}>
      <label htmlFor="username">User name</label>
      <input 
      id='username'
      placeholder='username'
      value={userName}
      onChange={(e) => { 
        setUserName(e.target.value)
      }}
      />
      <label htmlFor="email">Email</label>
      <input 
      id='email'
      placeholder="email"
      value={email}
      onChange={(e) => { 
        setEmail(e.target.value)
      }}/>
      <label htmlFor="password">Password</label>
      <input 
      type='password'
      id='password'
      placeholder="password"
      value={password}
      onChange={onChangePasswordHandler}/>
      <label htmlFor="confirmPassword">Confirm password</label>
      <input 
      type='password' 
      id='confirmPassword' 
      placeholder="Confirm password" 
      value={confirmPassword} 
      onChange={onChangeConfirmPasswordHandler}/>
      <button disabled={buttonDisabled} >Register User</button>
      </form>
    </section>
  )
}

export default RegisterUser;