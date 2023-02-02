import users from 'Assets/users.json';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Store/store';
import { Unauthorized } from '../Unauthorized';

export function Me() {  
  const authStatus = useSelector<RootState, boolean>((state) => state.isAuthorized)
  // ЕСЛИ ЗАШЕЛ НА ЭТУ СТРАНИЦУ НЕ АВТОРИЗОВАВШИСЬ
  if (!authStatus) {
    return (<Unauthorized />)
  }
  // ЕСЛИ АВТОРИЗОВАЛСЯ
  const usersAsArray = Object.entries(users)
  const currentUser = usersAsArray.filter(user => {
    return user[0] === localStorage.getItem('user') 
  })

  return (
    <div className="row">
      {authStatus && 
        <>
          <div className="col-md-4">
            <img src={currentUser[0][1].avatar} alt={currentUser[0][1].login} />
          </div>
          <div className="col-md-8 mt-3 mt-md-0">
            <p>
              <span className="badge text-bg-primary">Логин</span>&nbsp;
              {currentUser[0][1].login}
            </p>
            <p>
              <span className="badge text-bg-primary">E-mail</span>&nbsp;
              {currentUser[0][1]['e-mail']}
            </p>
            <p>
              <span className="badge text-bg-primary">Род деятельности</span>&nbsp;
              {currentUser[0][1].occupation}
            </p>
            <p>
              <span className="badge text-bg-primary">Местоположение</span>&nbsp;
              {currentUser[0][1].location}
            </p>
          </div>
        </>
      }
    </div>
  )
}