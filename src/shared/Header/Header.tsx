import logo from 'Assets/logo.png';
import users from 'Assets/users.json';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authorizationStatus } from 'Store/authorization';
import { RootState } from 'Store/store';
import styles from './header.sass';

export function Header() {
  const dispatch = useDispatch<any>()
  const navigation = useNavigate()
  const authStatus = useSelector<RootState, boolean>((state) => state.isAuthorized)
  
  function exit() {
    dispatch(authorizationStatus(false))
    localStorage.removeItem('user')
    navigation('/')
  }

  const usersAsArray = Object.entries(users)
  const currentUser = usersAsArray.filter(user => {
    return user[0] === localStorage.getItem('user') 
  })

  let enterBtn
  if (!authStatus) {
    enterBtn = <Link to='/login' className={`nav-link btn btn-outline-light ${styles.enterBtn}`}>Войти</Link>
  } else {
    enterBtn = <Link to='/' className={`nav-link btn btn-danger ${styles.exitBtn}`} onClick={exit}>Выйти</Link>
  }
  
  const [searchRequest, setSearchRequest] = useState('')
  function handlerChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchRequest(event.target.value);
  }
  function handlerSubmit(event: FormEvent) {
    event.preventDefault()
    navigation(`/search/${searchRequest}`)
  }

  return (
    <header className={styles.header}>
      <Navbar bg="primary" expand="md">
        <Container>
          <Navbar.Brand>
          <Link to='/' className='navbar-brand'>
            <img className={styles.logo} src={logo} alt="My UnSplaSH App" height="40" />
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              {authStatus &&
                <>
                  {/* КОЛЛЛЕКЦИИ */}
                  <Link to='/collections' className='nav-link text-light'>Коллекции</Link>              
                  {/* СТРАНИЦА ПОЛЬЗОВАТЕЛЯ */}
                  <Link to='/me' className='nav-link text-light'>{currentUser[0][1].login}</Link> 
                </>
              }
              {/* ВХОД */}        
              {enterBtn}
            </Nav>
            {/* ФОРМА ПОИСКА */}
            {authStatus &&
              <Form className="d-flex" onSubmit={handlerSubmit}>
                <Form.Control
                  type="search"
                  className="me-2"
                  value={searchRequest}
                  onChange={handlerChange}
                  placeholder="Поиск..."
                  aria-label="Поиск..."
                />
                <Button type='submit' variant="outline-light">Искать</Button>
              </Form>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>   
  )
}