import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import MyPage from '../pages/MyPage';
import BucketDetail from '../pages/BucketDetail';
import BucketList from '../pages/BucketList';
import Redirecting from '../pages/Redirecting';

const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/userId/:userId/my-page" element={<MyPage />} />
        <Route path="/userId/:userId/bucket-list" element={<BucketList />} />
        <Route
          path="/userId/:userId/bucket-list/:postId"
          element={<BucketDetail />}
        />
        <Route path="/redirecting" element={<Redirecting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
