import users from 'Assets/users.json';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizationStatus } from 'Store/authorization';
import { RootState } from 'Store/store';

export function Login() {
  // ПРОВЕРКА НА АВТОРИЗАЦИЮ
  const authStatus = useSelector<RootState, boolean>((state) => state.isAuthorized)
  // если уже вошел но зачем-то открыл страницу входа
  if (authStatus) {return (
    <div className='mt-3'>
      <h1 className='text-center'>Страница недоступна</h1>
      <h2 className='text-center mt-3'>Вы уже авторизовались</h2> 
      <p className='text-center'>Чтобы войти под другим пользователем выйдите и вернитесь на эту страницу</p>
    </div>
  )}
  
  const dispatch = useDispatch<any>()
  const navigation = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [firstSubmit, setFirstSubmit] = useState(false)
  let result = []
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
    result = asArray.filter(user => {
      return user[1].login === login && user[1].password === password 
    })
    if(result.length !== 0) {
      dispatch(authorizationStatus(true))
      navigation('/')
      localStorage.setItem('user', result[0][0])
    } 
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='inputLogin' className='form-label'>Логин</label>
        <input type='text' value={login} className='form-control' id='inputLogin' onChange={handleChangeLogin} required />
      </div>
      <div className='mb-3'>
        <label htmlFor='inputPassword' className='form-label'>Пароль</label>
        <input type='password' value={password} className='form-control' id='inputPassword' onChange={handleChangePassword} required />
      </div>
      <button type='submit' className='btn btn-primary'>Войти</button>
      {result.length === 0 && firstSubmit &&
        <h5 className='mt-3 text-danger'>Введенные логин и пароль не соответствуют не одному пользователю</h5>
      }
    </form> 
  )
}