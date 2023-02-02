import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';
import { generateId } from 'ReactUtils/generateRandomIndex';
import styles from './searchmodal.sass';

interface ITags {
  [K: string]: any
}

interface IDataContent {
  title: string
  description: string 
  img: string
  user: string
  tags: Array<ITags>
}

interface IData {
  data: IDataContent
  close: () => void
  showStatus: boolean
}

export function SearchModal({data, close, showStatus}:IData) {
  const modalNode = document.querySelector('#modal')
  if (!modalNode) return null
  let title = ''
  if (data.title === null) {
    title = 'Без названия'
  } else {
    title = data.title
  }
  const tags = data.tags.map(generateId)

  
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
        <p><strong>Теги</strong></p>
        <div className='card-tags d-flex flex-wrap'>
          {tags.map((tag) => 
            <span key={tag.id} className={`badge text-bg-primary ${styles.cardBage}`}>{tag.title}</span>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  ), modalNode)
}