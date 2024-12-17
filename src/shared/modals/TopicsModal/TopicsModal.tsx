import React, { useEffect, useState } from 'react';
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
  const [modalNode, setModalNode] = useState<Element | null>(null);
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    setModalNode(document.querySelector('#modal'))
    data.title === null ? setTitle('Без названия') : setTitle(data.title)
  }, []);
    
  return modalNode && ReactDOM.createPortal((
    <Modal show={showStatus} onHide={close} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="text-break">
            {title}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={data.img} alt={data.title} />
      </Modal.Body>
      <Modal.Footer style={{display:'block'}}>
        <p className="text-break">{data.description}</p>
        <p>Категория: <span className="badge text-bg-primary">{data.slug}</span></p>
        <p>Опубликовано: <span className="badge text-bg-primary">{data.published_at.split('T')[0]}</span></p>
      </Modal.Footer>
    </Modal>
  ), modalNode)
}