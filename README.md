# React приложение основанное на сервисе Unsplash

## Страницы приложения:

**Главная**

- Доступна без авторизации
- Отображает раздел Topics
- При нажатии на фотографию появляется модальное окно с ее оригиналом и подробной информацией о ней

**Страница входа**

- Доступна без авторизации
- Содержит обычную форму входа на сайт

**Страница пользователя**

- В меню это пункт одноименный с логином пользователя
- Доступна после авторизации
- Отображает данные пользователя

**Страница коллекций**

- Доступна после авторизации
- Содержит блоки с информацией о каждой коллекции и ссылкой на страницу с фотографиями данной коллекции

**Страница коллекции**

- Доступна после авторизации
- Содержит фотографии коллекции
- При нажатии на фотографию появляется модальное окно с ее оригиналом и подробной информацией о ней

**Страница поисковых результатов**

- Доступна после авторизации
- Содержит фотографии по конкретному запросу
- При нажатии на фотографию появляется модальное окно с ее оригиналом и подробной информацией о ней
- Имеется автоматическая подгрузка результатов (2 скролла + кнопка "Загрузить ещё")

**Страницы ошибок 404 и 401**

- Отображаются при запросе не существующих URL либо при открытии стрытой страницы без авторизации

## Для авторизации можно использовать следующие данные:
 
> Логин: "John", пароль: "qwe34r78ty"  
> Логин: "Pablo", пароль: "az567bu"

## Инструкция по развертыванию приложения на локальном компьютере:

- Установить GIT
- В командной строке склонировать репозиторий командой: `git clone https://github.com/MegaBulkOrg/my-splash.git`
- Перейти в папку склонированного проекта и установить все нужные компоненты командой `npm i`
- Запустить приложение командой: `npm run dev`
- Открыть его в браузере по URL http://localhost:3000/

## Используемый стек технологий:

- WebPack
- TypeScript
- React
- React Router
- Redux Thunk
- SSR
- SASS
- React-Bootstrap
