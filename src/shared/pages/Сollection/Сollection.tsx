import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useParams } from 'react-router-dom';
import { Loading } from 'Shared/Loading';
import { СollectionPhotosModal } from 'Shared/modals/СollectionPhotosModal';
import { collectionRequestAsync } from 'Store/collection';
import { RootState } from 'Store/store';
import { ErrorMsg } from '../ErrorMsg';
import { Unauthorized } from '../Unauthorized';
import styles from './collection.sass';

export interface IСollectionPhotosProps {
  id: string
  title: string
  description: string 
  img: string
  thumb: string
  user: string
}

export function Сollection() {  
  const authStatus = useSelector<RootState, boolean>((state) => state.isAuthorized)
  // ЕСЛИ ЗАШЕЛ НА ЭТУ СТРАНИЦУ НЕ АВТОРИЗОВАВШИСЬ
  if (!authStatus) {
    return (<Unauthorized />)
  }
  // ЕСЛИ АВТОРИЗОВАЛСЯ
  const dispatch = useDispatch<any>()  
  const сollectionPhotos = useSelector<RootState, IСollectionPhotosProps[]>((state) => state.collection.items)
  const loading = useSelector<RootState, boolean>((state) => state.collection.loading)
  const error = useSelector<RootState, string>((state) => state.collection.error)  
  const { id } = useParams()
  useEffect(() => {dispatch(collectionRequestAsync(id))},[])
  // Высплывашка с фотографией 
  const initialDetails = {
    title: '',
    description: '', 
    img: '',
    user: ''
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
    <section className='collection-imgs-list'>
      <div className='collection-imgs-list-container row'>
        {/* ЗАГРУЗКА */}
        {loading && <Loading />}  
        {/* ОШИБКИ */}
        {!loading && error !== '' && <ErrorMsg text={error} close={handleCloseError} showStatus={showError} />}
        {/* НЕТ ТОПИКОВ */}
        {!loading && error === '' && сollectionPhotos.length === 0 && 
          <h4 className='text-center'>К сожалению, изображения отсутствуют. Зайдите позже. Вероятно, они появятся.</h4>
        } 
        {/* КАРТИНКИ */}
        {!loading && сollectionPhotos.length !== 0 && 
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter='20px'>
              {/* 
                вариант с генератором не подходит поскольку он генерирует список во фрагменте и из-за этого 
                все картинки располагаются в один столбец и даже вариант с использованием react-flatten-children не решает эту проблему
              */}
              {сollectionPhotos.map((photo) => 
                <img key={photo.id} className={styles.picture} src={photo.thumb} onClick={
                  () => {
                    // скобки у вызова handleShowDetails нужны (проверено)
                    handleShowDetails()
                    setDetails({
                      title: photo.title,
                      description: photo.description, 
                      img: photo.img,
                      user: photo.user
                    })
                  }
                } alt={photo.title} />
              )}
            </Masonry>
          </ResponsiveMasonry>
        }
        <СollectionPhotosModal data={details} close={handleCloseDetails} showStatus={showDetails} />
      </div>
    </section>
  );
}