import users from 'Assets/users.json';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizationStatus } from 'Store/authorization';

export function Login() {  
  const dispatch = useDispatch<any>()
  const navigation = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [firstSubmit, setFirstSubmit] = useState(false)
  let result = null
  
  function handleChangeLogin(event: ChangeEvent<HTMLInputElement>) {
    setLogin(event.target.value)
  }
  
  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFirstSubmit(true)
    const asArray = Object.entries(users)
    result = asArray.find(user => user[1].login === login && user[1].password === password)
    if(result !== undefined) {
      dispatch(authorizationStatus(true))
      navigation('/')
      localStorage.setItem('user', result[0])
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='inputLogin' className='form-label'>Логин</label>
        <input type='text' value={login} className='form-control' id='inputLogin' onChange={handleChangeLogin} autoComplete='on' required />
      </div>
      <div className='mb-3'>
        <label htmlFor='inputPassword' className='form-label'>Пароль</label>
        <input type='password' value={password} className='form-control' id='inputPassword' onChange={handleChangePassword} autoComplete='on' required />
      </div>
      <button type='submit' className='btn btn-primary'>Войти</button>
      {result === null && firstSubmit &&
        <h5 className='mt-3 text-danger'>Введенные логин и пароль не соответствуют не одному пользователю</h5>
      }
    </form> 
  )
}