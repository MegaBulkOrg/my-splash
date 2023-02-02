import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';

interface IDataContent {
  title: string
  description: string 
  img: string
  user: string
}

interface IData {
  data: IDataContent
  close: () => void
  showStatus: boolean
}

export function СollectionPhotosModal({data, close, showStatus}:IData) {
  const modalNode = document.querySelector('#modal')
  if (!modalNode) return null
  let title = ''
  if (data.title === null) {
    title = 'Без названия'
  } else {
    title = data.title
  }
  
  return ReactDOM.createPortal((
    <Modal show={showStatus} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={data.img} alt={data.title} />
      </Modal.Body>
      <Modal.Footer style={{display:'block'}}>
        <p>{data.description}</p>
        <p>Фотограф: <span className="badge text-bg-primary">{data.user}</span></p>
      </Modal.Footer>
    </Modal>
  ), modalNode)
}