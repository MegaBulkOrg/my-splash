import React from 'react';
import { Link } from 'react-router-dom';
import { generateId } from 'ReactUtils/generateRandomIndex';
import styles from './collectionscard.sass';

interface ITags {
  [K: string]: any
}

export interface ICollectionsCardProps {
  id: string
  title: string
  published_at: string
  tags: Array<ITags>
  user: string
  img: string
}

export function CollectionsCard(props: ICollectionsCardProps) {  
  const tags = props.tags.map(generateId)
  
  return (
    <div className='card'>           
      <div className={styles.cardImgContainer}>
        <img className={`${styles.cardImg} card-img-top`} src={props.img} alt={props.title} />
      </div>
      <div className={`${styles.cardBody} card-body d-flex flex-column justify-content-between`}>
        <div className='card-body-text'>
          <h5 className='card-title'>
            {props.title.length <= 40 ? props.title : props.title.substring(0, 40)+' ...'}
          </h5>
          <p className='card-text'><small className='text-muted'>
            <strong>Автор:</strong> {props.user}
            <br/>
            <strong>Опубликовано:</strong> {props.published_at.split('T')[0]}
          </small></p>
          <div className='card-tags d-flex flex-wrap'>
            {tags.map((tag) => 
              <span key={tag.id} className={`badge text-bg-primary ${styles.cardBage}`}>{tag.title}</span>
            )}
          </div>
        </div>
        <Link to={`/collection/${props.id}`} className='btn btn-primary'>Подробнее</Link>
      </div>
    </div> 
  );
}