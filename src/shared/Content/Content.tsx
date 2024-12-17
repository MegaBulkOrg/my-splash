import React from 'react';
import styles from './content.sass';

interface IContentProps {
  children?: React.ReactNode
}

export function Content({children}: IContentProps) {
  return (
    <main className={styles.main}>
      <div className='container py-5'>
        {children}
      </div>
    </main>
  );
}