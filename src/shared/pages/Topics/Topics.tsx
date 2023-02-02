import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Loading } from 'Shared/Loading';
import { TopicsModal } from 'Shared/modals/TopicsModal';
import { RootState } from 'Store/store';
import { topicsRequestAsync } from 'Store/topics';
import { ErrorMsg } from '../ErrorMsg';
import styles from './topics.sass';

export interface ITopicsProps {
  id: string
  slug: string
  title: string
  description: string 
  published_at: string
  img: string
  thumb: string
}

export function Topics() {  
  const dispatch = useDispatch<any>()  
  const topicsList = useSelector<RootState, ITopicsProps[]>((state) => state.topics.items)
  const loading = useSelector<RootState, boolean>((state) => state.topics.loading)
  const error = useSelector<RootState, string>((state) => state.topics.error)  
  useEffect(() => {dispatch(topicsRequestAsync())},[])
  // Высплывашка с фотографией 
  const initialDetails = {
    slug: '',
    title: '',
    description: '', 
    published_at: '',
    img: ''
  }
  const [details, setDetails] = useState(initialDetails)
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => setShowDetails(true)
  const handleCloseDetails = () => setShowDetails(false)
  // Сообщение об ошибке
  const [showError, setShowError] = useState(false)
  const handleShowError = () => setShowError(true)
  const handleCloseError = () => setShowError(false)
  useEffect(() => {
    // скобки у вызова handleShowError нужны (проверено)
    if(error !== '') handleShowError()
  }, [error])

  return (
    <section className='topics-imgs-list'>
      <div className='topics-imgs-list-container row'>         
        {/* ЗАГРУЗКА */}
        {loading && <Loading />}  
        {/* ОШИБКИ */}
        {!loading && error !== '' && <ErrorMsg text={error} close={handleCloseError} showStatus={showError} />}
        {/* НЕТ ТОПИКОВ */}
        {!loading && error === '' && topicsList.length === 0 && 
          <h4 className='text-center'>К сожалению, пока топиков нет. Зайдите позже. Вероятно, они появятся.</h4>
        } 
        {/* КАРТИНКИ */}
        {!loading && topicsList.length !== 0 && 
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter='20px'>
              {/* 
                вариант с генератором не подходит поскольку он генерирует список во фрагменте и из-за этого 
                все картинки располагаются в один столбец и даже вариант с использованием react-flatten-children не решает эту проблему
              */}
              {topicsList.map((topic) => 
                <img key={topic.id} className={styles.picture} src={topic.thumb} onClick={
                  () => {
                    // скобки у вызова handleShowDetails нужны (проверено)
                    handleShowDetails()
                    setDetails({
                      slug: topic.slug,
                      title: topic.title,
                      description: topic.description, 
                      published_at: topic.published_at,
                      img: topic.img
                    })
                  }
                } alt={topic.title} />
              )}
            </Masonry>
          </ResponsiveMasonry>
        }
        <TopicsModal data={details} close={handleCloseDetails} showStatus={showDetails} />
      </div>
    </section>
  );
}