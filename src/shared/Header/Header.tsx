import logo from 'Assets/logo.png';
import { authorizationStatus } from 'Store/authorization';
import { RootState } from 'Store/store';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../icons/Icon/Icon';
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

  // КНОПКА ВХОДА/ВЫХОДА
  let enterBtn
  if (!authStatus) {
    enterBtn = <Link to='/login' className='nav-link d-flex justify-content-center'>
      <Icon name="enter" />
    </Link>
  } else {
    enterBtn = <Link to='/' className='nav-link d-flex justify-content-center' onClick={exit}>
      <Icon name="exit" />
    </Link>
  }
  
  // ВСЕ ДЛЯ ПОИСКА
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
      <Navbar expand="md">
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
                  {/* КОЛЛЕКЦИИ */}
                  <Link to='/collections' className='nav-link d-flex justify-content-center'>
                    <Icon name="collections" />
                  </Link>              
                  {/* СТРАНИЦА ПОЛЬЗОВАТЕЛЯ */}                  
                  <Link to='/me' className='nav-link d-flex justify-content-center'>
                    <Icon name="me" />
                  </Link>
                </>
              }
              {/* ВХОД */}
              {enterBtn}
            </Nav>
            {/* ФОРМА ПОИСКА */}
            {authStatus &&
              <Form className='d-flex' onSubmit={handlerSubmit}>
                <Form.Control
                  type="search"
                  className="me-2"
                  value={searchRequest}
                  onChange={handlerChange}
                  placeholder="Поиск..."
                  aria-label="Поиск..."
                />
                <Button type='submit' variant="outline-primary">Искать</Button>
              </Form>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>   
  )
}