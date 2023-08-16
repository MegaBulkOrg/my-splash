import { Header } from "Shared/Header";
import { AlreadyAuthorized } from "Shared/pages/AlreadyAuthorized";
import { Login } from "Shared/pages/Login";
import { Me } from "Shared/pages/Me";
import { MissingParam } from "Shared/pages/MissingParam";
import { NotFound } from "Shared/pages/NotFound";
import { Search } from "Shared/pages/Search";
import { Topics } from "Shared/pages/Topics";
import { Unauthorized } from "Shared/pages/Unauthorized";
import { Сollection } from "Shared/pages/Сollection";
import { Сollections } from "Shared/pages/Сollections";
import { authorizationStatus } from "Store/authorization";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "./global.css";
import { Content } from "./shared/Content/Content";
import { RootState, rootReducer } from "./store/store";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function AppContent() {
  // проверка открытой сессии при открытии любой страницы и авторизация если сессия есть
  // это не для перехода по внутренней ссылке, а именно для открытия страницы
  const dispatch = useDispatch<any>()
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user !== null) dispatch(authorizationStatus(true))
  }, [])  
  
  // для перехода после авторизации (когда залогинился и не перезагрузил страницу)
  const isAuth = useSelector<RootState, boolean>((state) => state.isAuthorized)

  return (
    <>
      <Header />
      <Content>
        <Routes>
          {/* 
            под новую версию React пришлось переделать проверку на авторизацию, так как, если открыть (не перейти по внутренней ссылке, а именно открыть) страницу,
            где в начале идет условие типа "если !isAuth то return null", а потом прописаны вызовы хуков, то страница не откроется, и получим ошибку, типа
            Rendered more hooks than during the previous render.
          */}
          <Route path="/" element={<Topics/>} />
          <Route path="/login" element={isAuth === false ? <Login/> : <AlreadyAuthorized />} />
          <Route path="/collections" element={isAuth !== false ? <Сollections/> : <Unauthorized />} />
          <Route path="/collection/:id" element={isAuth !== false ?  <Сollection/> : <Unauthorized />} />
          <Route path="/collection" element={<MissingParam />} />
          <Route path="/me" element={isAuth !== false ?  <Me/> : <Unauthorized />} />
          <Route path="/search/:request" element={isAuth !== false ?  <Search/> : <Unauthorized />} />
          <Route path="/search" element={<MissingParam />} />
          <Route path="*" element={<NotFound/>} />
      </Routes>
      </Content>
    </>
  );
}

export const ClientApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export const ServerApp = (url: string) => {
  return (
    <Provider store={store}>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </Provider>
  );
};
