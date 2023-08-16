import React from 'react';

export function MissingParam() {
  return (
    <div className='mt-3'>
      <h1 className='text-center'>Ошибка 400</h1>
      <h2 className='text-center mt-3'>Не указан параметр!</h2> 
      <p className='text-center'>Проверьте правильность введенного URL</p>
    </div>
  )
}