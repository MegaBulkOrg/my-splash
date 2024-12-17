import React from 'react';

export function AlreadyAuthorized() {
  return (
    <div className='mt-3'>
      <h1 className='text-center'>Страница недоступна</h1>
      <h2 className='text-center mt-3'>Вы уже авторизовались</h2> 
      <p className='text-center'>Чтобы войти под другим пользователем выйдите и вернитесь на эту страницу</p>
    </div>
  )
}