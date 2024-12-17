import React from 'react';
import styles from './loading.sass';

export function Loading() {  
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className='spinner-grow text-primary' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
        <div className='spinner-grow text-secondary' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
        <div className='spinner-grow text-success' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
        <div className='spinner-grow text-danger' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
        <div className='spinner-grow text-warning' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
        <div className='spinner-grow text-info' role='status'>
          <span className='visually-hidden'>Загрузка...</span>
        </div>
      </div>
    </div>
  )
}