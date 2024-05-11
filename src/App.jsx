import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import DetailThread from './pages/DetailThread';
import { asyncPreloadProcess } from './states/isPreload/action';
import Spinner from './components/elements/Spinner';
import { getAccessToken } from './utils/storage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import PageNotfound from './pages/PageNotfound';
import AddThread from './pages/AddThread';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.isPreload);
  const { data: userData } = useSelector((state) => state.auth);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  useEffect(() => {
    if (getAccessToken()) dispatch(asyncPreloadProcess());
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Header userData={userData} onSignOut={onSignOut} />
      <main className="flex justify-center">
        <div className="py-14 max-w-3xl w-full h-[calc(100vh-52px)] px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/thread/:id" element={<DetailThread />} />
            {!userData && !getAccessToken() ? (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            ) : (
              <Route path="/thread-add" element={<AddThread />} />
            )}
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
