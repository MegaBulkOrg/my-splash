import React from 'react';

export function Unauthorized() {
  return (
    <div className='mt-3'>
      <h1 className='text-center'>Ошибка 401</h1>
      <h2 className='text-center mt-3'>Доступ закрыт!</h2> 
      <p className='text-center'>Авторизуйтесь, чтобы получить доступ к этой части сайта</p>
    </div>
  )
}