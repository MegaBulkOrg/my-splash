import users from 'Assets/users.json';
import React from 'react';
import styles from './me.sass';

export function Me() {
  const usersAsArray = Object.entries(users)
  const currentUser = usersAsArray.find(user => user[0] === localStorage.getItem('user'))

  return (
    <div className="row">
      <div className={`col-md-4 ${styles.avatar}`}>
        <img src={currentUser?.[1].avatar} alt={currentUser?.[1].login} />
      </div>
      <div className="col-md-8 mt-3 mt-md-0">
        <p>
          <span className="badge text-bg-primary">Логин</span>&nbsp;
          {currentUser?.[1].login}
        </p>
        <p>
          <span className="badge text-bg-primary">E-mail</span>&nbsp;
          {currentUser?.[1]['e-mail']}
        </p>
        <p>
          <span className="badge text-bg-primary">Род деятельности</span>&nbsp;
          {currentUser?.[1].occupation}
        </p>
        <p>
          <span className="badge text-bg-primary">Местоположение</span>&nbsp;
          {currentUser?.[1].location}
        </p>
      </div>
    </div>
  )
}