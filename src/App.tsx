import React, { useEffect, useState } from "react";
import SSRProvider from 'react-bootstrap/SSRProvider';
import { hot } from "react-hot-loader/root";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Login } from "Shared/pages/Login";
import { Me } from "Shared/pages/Me";
import { Search } from "Shared/pages/Search";
import { Сollection } from "Shared/pages/Сollection";
import { Сollections } from "Shared/pages/Сollections";
import { authorizationStatus } from "Store/authorization";
import "./global.css";
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { NotFound } from "./shared/pages/NotFound";
import { Topics } from "./shared/pages/Topics";
import { rootReducer } from "./store/store";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function AppContent() {
  const dispatch = useDispatch<any>()
  const isAuth = localStorage.getItem('user')
  if (isAuth !== null) dispatch(authorizationStatus(true))

  return (
    <BrowserRouter>
      <SSRProvider>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Topics/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/collections" element={<Сollections/>} />
            <Route path="/collection/:id" element={<Сollection/>} />
            <Route path="/me" element={<Me/>} />
            <Route path="/search/:request" element={<Search/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Content>
      </SSRProvider>
    </BrowserRouter>
  );
}

function AppComponent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <Provider store={store}>{mounted && <AppContent />}</Provider>;
}

export const App = hot(() => <AppComponent />);