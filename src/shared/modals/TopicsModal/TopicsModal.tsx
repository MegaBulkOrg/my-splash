import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';

interface IDataContent {
  slug: string
  title: string
  description: string 
  published_at: string
  img: string
}

interface IData {
  data: IDataContent
  close: () => void
  showStatus: boolean
}

export function TopicsModal({data, close, showStatus}:IData) {
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
        <p>Категория: <span className="badge text-bg-primary">{data.slug}</span></p>
        <p>Опубликовано: <span className="badge text-bg-primary">{data.published_at.split('T')[0]}</span></p>
      </Modal.Footer>
    </Modal>
  ), modalNode)
}