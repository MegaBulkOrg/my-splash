import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionsCard, ICollectionsCardProps } from 'Shared/CollectionsCard';
import { GenericElements } from 'Shared/GenericElements';
import { Loading } from 'Shared/Loading';
import { collectionsRequestAsync } from 'Store/collections';
import { RootState } from 'Store/store';
import { ErrorMsg } from '../ErrorMsg';
import { Unauthorized } from '../Unauthorized';
import styles from "./collections.sass";

export function Сollections() {  
  const authStatus = useSelector<RootState, boolean>((state) => state.isAuthorized)
  // ЕСЛИ ЗАШЕЛ НА ЭТУ СТРАНИЦУ НЕ АВТОРИЗОВАВШИСЬ
  if (!authStatus) {
    return (<Unauthorized />)
  }
  // ЕСЛИ АВТОРИЗОВАЛСЯ
  const dispatch = useDispatch<any>()
  const collectionsList = useSelector<RootState, ICollectionsCardProps[]>((state) => state.collections.items)
  const loading = useSelector<RootState, boolean>((state) => state.collections.loading)
  const error = useSelector<RootState, string>((state) => state.collections.error)  
  useEffect(() => {dispatch(collectionsRequestAsync())},[])
  // Сообщение об ошибке
  const [showError, setShowError] = useState(false)
  const handleShowError = () => setShowError(true)
  const handleCloseError = () => setShowError(false)
  useEffect(() => {
    // скобки у вызова handleShowError нужны (проверено)
    if(error !== '') handleShowError()
  }, [error])

  return (
    <section className='collections-cards-list'>
      <div className='collections-cards-list-container row'>
        {/* ЗАГРУЗКА */}
        {authStatus && loading && <Loading />}
        {/* ОШИБКИ */}
        {authStatus && !loading && error !== '' && 
          <ErrorMsg text={error} close={handleCloseError} showStatus={showError} />
        }
        {/* НЕТ ТОПИКОВ */}
        {authStatus && !loading && error === '' && collectionsList.length === 0 && 
            <h4 className='text-center'>К сожалению, пока топиков нет. Зайдите позже. Вероятно, они появятся.</h4>
        }
        {/* КАРТОЧКИ */}
        {authStatus && !loading && collectionsList.length !== 0 && 
          <div className={styles.items}>
            <GenericElements<ICollectionsCardProps> list={collectionsList} Template={CollectionsCard}/>
          </div>
        }
      </div>
    </section>
  );
}