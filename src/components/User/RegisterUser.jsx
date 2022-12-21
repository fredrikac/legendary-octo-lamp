import { useState } from "react";

const RegisterUser = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
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

  return (
    <section data-testid='add-user-component'>
      <h1>Användar-registrering</h1>
      <label htmlFor="username">User name</label>
      <input 
      id='username'
      placeholder='username'
      />
      <label htmlFor="email">Email</label>
      <input 
      id='email'
      placeholder="email"/>
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
    </section>
  )
}

export default RegisterUser;