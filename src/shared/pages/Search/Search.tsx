import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useParams } from 'react-router-dom'
import { Loading } from 'Shared/Loading'
import { SearchModal } from 'Shared/modals/SearchModal'
import { RootState } from 'Store/store'
import { ErrorMsg } from '../ErrorMsg'
import { Unauthorized } from '../Unauthorized'
import styles from './search.sass'

interface ITags {
  [K: string]: any
}

export interface ISearchResultsProps {
  id: string
  title: string
  description: string
  img: string
  thumb: string
  user: string
  tags: Array<ITags>
}

export function Search() {
  // ПРОВЕРКА НА АВТОРИЗАЦИЮ
  const authStatus = useSelector<RootState, boolean>(
    (state) => state.isAuthorized
  )
  // если не прошел проверку
  if (!authStatus) {
    return <Unauthorized />
  }

  // состояния
  const { request } = useParams()
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [nextPageNo, setNextPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [loading, setLoading] = useState(false)
  const [errorLoading, setErrorLoading] = useState('')
  const bottomOfList = useRef<HTMLDivElement>(null)
  const [loadingButtonAction, setLoadingButtonAction] = useState(false)
  const [loadingsCounter, setLoadingsCounter] = useState(0)
  // для высплывашки с фотографией
  const initialDetails = {
    title: '',
    description: '',
    img: '',
    user: '',
    tags: [{}],
  }
  const [details, setDetails] = useState(initialDetails)
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => setShowDetails(true)
  const handleCloseDetails = () => setShowDetails(false)
  // для сообщения об ошибке
  const [showError, setShowError] = useState(false)
  const handleShowError = () => setShowError(true)
  const handleCloseError = () => setShowError(false)

  // функция загрузки
  async function load() {
    setLoading(true)
    setErrorLoading('')
    try {const {data: { results, total_pages }} = await axios.get(`https://api.unsplash.com/search/photos?query=${request}&page=${nextPageNo}&client_id=${process.env.ACCESS_KEY}`)
      const searchResultsNextPage = results.map(
        (data: { [x: string]: any }): ISearchResultsProps | null => {
          return {
            id: data['id'],
            title: data['description'],
            description: data['alt_description'],
            img: data['urls']['raw'],
            thumb: data['urls']['regular'],
            tags: data['tags'],
            user: data['user']['name'],
          }
        }
      )
      // setTimeout тут добавлен потому что картинки на странице появляются медленнее чем меняется номер страницы
      // от этого еще до того как все картинки успеют отобразиться на странице номер страницы уже поменяется и от этого
      // автоматически второй раз происходит загрузка результатов в итоге страницу можно прокрутить не 2 а 1 раз
      // дисклеймер: я знаю что решение с setTimeout не идеальное но оно простое и не требует какого-то доп. кода
      setTimeout(() => setNextPageNo((prevPage) => prevPage + 1), 500)
      setTotalPages(total_pages)
      setSearchResults((prevChildren) => prevChildren.concat(...searchResultsNextPage))
    } catch (error) {
      setErrorLoading(String(error))
      if (error !== '') handleShowError()
    }
    setLoading(false)
  }

  // запуск повторной загрузки результатов поиска
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        if (nextPageNo <= totalPages && entries[0].isIntersecting && loadingsCounter < 3) {
          setLoadingsCounter(loadingsCounter + 1)
          load()
        } else if (loadingsCounter >= 3) setLoadingButtonAction(true)
      },
      { rootMargin: '10px' }
    )
    // подключаем Observer к элементу в конце страницы и делаем условие
    // чтобы TypeScript не ругался: потенциально элемента может не быть
    if (bottomOfList.current) observer.observe(bottomOfList.current)
    // отвязываем предыдущий useEffect
    return () => {
      if (bottomOfList.current) observer.unobserve(bottomOfList.current)
    }
    // по идее в зависимости нужно добавить bottomOfList.current потому что это внешняя зависимость
    // (как только меняется ссылка на элемент useEffect должен триггериться)
    // но это вызывает много проблем и поэтому от добавления этой зависимости я решил отказаться
  }, [nextPageNo, loadingButtonAction])

  // когда в шапке задаем другой запрос
  useEffect(() => {
    // так как при первом рендере useEffect обязательно триггерится
    // то во избежание задвоения результатов запроса при превом вызове useEffect
    // нужно нужно отменить загрузку
    if (nextPageNo !== 1) {
      setSearchResults([])
      setNextPageNo(1)
      setLoadingsCounter(0)
      setTotalPages(2)
      setLoadingButtonAction(false)
    }
    // по идее nextPageNo нужно добавить к зависимостям так как это значение используется в этом useEffect но я специально
    // отказался от этого так как при этом нужно было бы решать дополнительные проблемы с повторной загрузкой результатов
    // хотя в будущем если приложение будет меняться из-за отсутствия этой зависимости могут возникнуть проблемы
  }, [request])

  function loadMoreButton() {
    setLoadingsCounter(0)
    setLoadingButtonAction(false)
  }

  return (
    <section className='search-results'>
      <div className='search-results-container row'>
        {/* ОШИБКИ */}
        {!loading && errorLoading !== '' && (
          <ErrorMsg text={errorLoading} close={handleCloseError} showStatus={showError}/>
        )}
        {/* НЕТ РЕЗУЛЬТАТОВ ПОИСКА */}
        {!loading && errorLoading === '' && searchResults.length === 0 && (
          <h4 className='text-center'>
            К сожалению, поиск не дал результатов.
            <br />
            Попробуйте изменить текст запроса или осуществить поиск позже.
          </h4>
        )}
        {/* 
          КАРТИНКИ - из условия удалена проверка '!loading' так как
          из-за нее список каждый раз рендерился заново и пользователя
          перекидывало в начало страницы
        */}
        {searchResults.length !== 0 && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter='20px'>
              {/* 
                вариант с генератором не подходит поскольку он генерирует список во фрагменте и из-за этого 
                все картинки располагаются в один столбец и даже вариант с использованием react-flatten-children не решает эту проблему
              */}
              {searchResults.map((photo) => (
                <img
                  key={photo.id}
                  className={styles.picture}
                  src={photo.thumb}
                  onClick={() => {
                    // скобки у вызова handleShowDetails нужны (проверено)
                    handleShowDetails()
                    setDetails({
                      title: photo.title,
                      description: photo.description,
                      img: photo.img,
                      user: photo.user,
                      tags: photo.tags,
                    })
                  }}
                  alt={photo.title}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
        {/* КОНЕЦ ЗАГРУЖЕННЫХ ИЗОБРАЖЕНИЙ */}
        <div ref={bottomOfList} />
        
        {/* ЗАГРУЗКА - лодаер лучше поставить под списком: тогда при
            подгрузке новых результатов лоадер будет виден не в начале странице
            а там где закончился список с предыдущими результатами
        */}
        {loading && <Loading />}
        
        
        {/* КНОПКА ЗАГРУЗКИ ОЧЕРЕДНОЙ СТРАНИЦЫ РЕЗУЛЬТАТОВ ПОИСКА */}
        {nextPageNo <= totalPages && loadingButtonAction && (
          <div className={styles.loadMore}>
            <Button variant='primary' size='lg' onClick={loadMoreButton}>
              Загрузить ещё
            </Button>
          </div>
        )}
        {/* КОГДА ДОСТИГ КОНЦА СПИСКА С РЕЗУЛЬТАТАМИ ПОИСКА */}
        {searchResults.length !== 0 && nextPageNo > totalPages && (
          <h4 className='text-center mt-5'>
            Больше по данному запросу ничего не найдено
          </h4>
        )}
        {/* ВСПЛЫВАШКА */}
        <SearchModal
          data={details}
          close={handleCloseDetails}
          showStatus={showDetails}
        />
      </div>
    </section>
  )
}
