import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import MyPage from '../pages/MyPage';
import BucketDetail from '../pages/BucketDetail';

const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/bucket-list/:id" element={<BucketDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
