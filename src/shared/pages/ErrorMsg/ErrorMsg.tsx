import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface IErrorMsg {
  text: string
  close: () => void
  showStatus: boolean
}

export function ErrorMsg({text, close, showStatus}:IErrorMsg) {
  return (
    <ToastContainer className="p-5" position='bottom-end'>
      <Toast show={showStatus} onClose={close}>
        <Toast.Header>
          <span className='text-danger fs-3'>&#9888;</span>
          &nbsp;&nbsp;
          <strong className="me-auto">Произошла ошибка</strong>
        </Toast.Header>
        <Toast.Body>
          <p>{text}</p>
          <p>Попробуйте перезагрузить приложение</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}